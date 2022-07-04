/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BackIcon,
  ClipMenuIcon,
  EmojiMenuIcon,
  MenuDotIcon,
  SearchIcon,
  SendIcon,
} from "../utils/icons";
import db from "../utils/firebase";
import {
  doc,
  serverTimestamp,
  query,
  addDoc,
  collection,
  where,
  getDoc,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import Alert from "./Alert";
import { getContactEmail, getLoggedUserData, timeSince } from "../utils/helper";

const ChatWindow = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [currentContact, setCurrentContact] = useState<any>({});
  const [error, setError] = useState("");

  const element = document.getElementById("message-container");

  const { id } = router.query;
  let userData = getLoggedUserData();

  const getUserData = async () => {
    if (!id) return;
    setCurrentContact({});
    //get current contact data
    const chatRef = doc(db, "chats", `${id}`);
    const chatData: any = (await getDoc(chatRef)).data();

    if (chatData?.users) {
      const contactData = getContactEmail(chatData, userData?.email) || "";

      const userRef = collection(db, "users");
      const userChats = query(
        userRef,
        where("email", "==", `${contactData?.email}`)
      );
      //  current contact listner
      const contactSnapShot = await onSnapshot(userChats, (querySnapshot) => {
        querySnapshot.forEach((contactDetails) => {
          const contactData = contactDetails.data();
          if (!contactData) return;
          //check user active status
          let timeStamp =
            contactData?.activeStatus === true
              ? "Active now"
              : `Active ${timeSince(
                  contactData?.lastSeen?.seconds * 1000
                )} ago` || "";
          setCurrentContact({
            name: contactData?.displayName || contactData?.email?.split("@")[0],
            lastSeen: timeStamp || "",
            avatar:
              contactData?.avatar ||
              "https://ui-avatars.com/api/&background=4d148c&color=fff&name=S",
          });
        });
      });
    }
  };

  const getChatData = async () => {
    if (!id) return;

    // get messages from subcollection
    const chatRef = collection(db, "chats", `${id}`, "messages");
    const userChats = query(chatRef, orderBy("timestamp", "asc"), limit(100));
    const messageSnapShot = await onSnapshot(userChats, (querySnapshot) => {
      const chats: any = [];
      querySnapshot.forEach((chat) => {
        const chatData = chat?.data();
        const localTimeStamp =
          new Date(chatData?.timestamp?.seconds * 1000)?.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }
          ) || "";
        chats.push({
          message: chatData.message || "",
          sender: chatData.sender || "",
          timestamp: `${localTimeStamp}`,
        });
      });
      setMessages([]);
      setMessages(chats);
    });
  };

  const scrollToBottom = () => {
    if (element?.scrollTop !== undefined)
      element.scrollTop = element?.scrollHeight;
  };

  useEffect(() => {
    getChatData();
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [element]);

  const handleAddMessages = async () => {
    if (!message) return;
    const chatRef = collection(db, "chats", `${id}`, "messages");
    const messageData = {
      message: message,
      sender: userData?.email,
      timestamp: serverTimestamp(),
    };
    const messageDocRef = await addDoc(chatRef, { ...messageData })
      .then((res) => {
        setMessage("");
        const chatsRef = doc(db, "chats", `${id}`);
        setDoc(
          chatsRef,
          {
            lastMessageTimeStamp: messageData.timestamp,
            lastMessage: messageData.message,
          },
          { merge: true }
        );
        scrollToBottom();
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="h-full flex-[30%] border-r border-gray-700 flex flex-col text-[#e9edef] bg-[#0b141a]">
      {/* error message */}
      {error && (
        <Alert title={error} type="error" onClose={() => setError("")} />
      )}

      {/* nav */}
      <div className="bg-[#202c33] h-16 flex justify-between items-center px-2 md:px-5 py-3">
        <div className="flex justify-between items-center">
          <div
            className="mx-2 md:hidden"
            onClick={() => router.push({ pathname: `/chat` })}
          >
            <BackIcon />
          </div>
          <img
            className="h-10 w-10 rounded-full cursor-pointer"
            src={currentContact?.avatar}
            alt="avatar"
          />
          <div className="flex flex-col justify-center">
            <p className="ml-3 text-base font-medium text-gray-300">
              {currentContact?.name || ""}
            </p>

            <p className="ml-3 -mb-2 text-sm text-gray-300 font-normal">
              {currentContact?.lastSeen || ""}
            </p>
          </div>
        </div>
        <div className="flex text-gray-300">
          <SearchIcon classes="cursor-not-allowed" />
          <span className="ml-4">
            <MenuDotIcon classes="cursor-not-allowed" />
          </span>
        </div>
      </div>

      {/* chats */}
      <div className="relative flex-1 ">
        <div className="h-full w-full z-20 bg-chat-bg bg-contain bg-repeat opacity-5"></div>
        <div
          id="message-container"
          className="absolute w-full h-full top-0 px-7 md:px-20 py-5 flex flex-col space-y-1 overflow-y-auto"
        >
          {messages.map((chat: any, index: number) => (
            <div
              key={index}
              className={`flex py-1 lg:py-0  ${
                chat.sender !== userData?.email
                  ? "justify-start"
                  : " justify-end"
              } `}
            >
              <div
                className={`relative min-w-[5.5rem] max-w-[16rem] text-gray-300  xl:max-w-xl ${
                  chat.sender !== userData?.email
                    ? "bg-[#202c33]"
                    : "bg-[#025d4b]"
                } py-0.5 px-3 rounded-md  space-x-3`}
              >
                <div
                  className={`flex justify-start my-1 text-justify mb-4`}
                  style={{ wordBreak: "break-all" }}
                >
                  {chat.message || ""}
                </div>
                <p
                  className={`absolute bottom-0.5 right-1 text-xs ${
                    chat.sender !== userData?.email ? "text-gray-300 " : ""
                  }`}
                >
                  {chat?.timestamp || ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* messaging panel */}
      <div className="flex justify-between items-center py-2 px-3 md:px-5 bg-[#202c33]">
        <div className="hidden text-gray-400 space-x-5 md:flex">
          <EmojiMenuIcon classes="cursor-not-allowed" />
          <ClipMenuIcon classes="cursor-not-allowed" />
        </div>
        <div className="flex-1 pr-3 md:px-5">
          <input
            className="w-full rounded-md bg-[#2a3942] py-2 px-3 focus:border-none active:border-none outline-none"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDownCapture={(event) => {
              if (event.which === 13) handleAddMessages();
            }}
          />
        </div>
        <div
          className="text-gray-400 rounded-full p-2 flex justify-center items-center cursor-pointer transform hover:scale-105 hover:shadow-md bg-[#35897E]"
          onClick={handleAddMessages}
        >
          <SendIcon classes="transform rotate-90 text-white" />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
