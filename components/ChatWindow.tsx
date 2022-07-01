/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
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
  getDocs,
  collection,
  where,
  getDoc,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Alert from "./Alert";

const ChatWindow = () => {
  const router = useRouter();

  const [messages, setMessages] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [currentContact, setCurrentContact] = useState<any>({});
  const [error, setError] = useState("");

  const { id } = router.query;
  const userEmail =
    typeof window !== "undefined" &&
    localStorage.getItem("WAW-Clone-userEmail");

  const getUserData = async () => {
    if (!id) return;

    //get current contact data
    const chatRef = doc(db, "chats", `${id}`);
    const chatData: any = (await getDoc(chatRef)).data();

    if (chatData?.users) {
      const contactEmail = chatData.users.filter(
        (email: string) => userEmail !== email
      );
      const userRef = collection(db, "users");
      const userChats = query(
        userRef,
        where("email", "==", `${contactEmail[0]}`)
      );
      const contactInfo: any = await getDocs(userChats).catch((err) =>
        setError(err.message)
      );
      contactInfo.forEach((contact: any) => {
        const contactData = contact.data();
        setCurrentContact({
          name: contactData?.email?.split("@")[0],
          lastSeen: contactData?.lastSeen || "",
          avatar: contactData?.avatar || "",
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

  useEffect(() => {
    getChatData();
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddMessages = async () => {
    if (!message) return;
    const chatRef = collection(db, "chats", `${id}`, "messages");
    const messageDocRef = await addDoc(chatRef, {
      message: message,
      sender: userEmail,
      timestamp: serverTimestamp(),
    })
      .then((res) => setMessage(""))
      .catch((err) => setError(err.message));
  };
  return (
    <div className="h-full flex-[30%] border-r border-gray-700 flex flex-col text-[#e9edef] bg-[#0b141a]">
      {/* error message */}
      {error && (
        <Alert title={error} type="error" onClose={() => setError("")} />
      )}

      {/* nav */}
      <div className="bg-[#202c33] h-16 flex justify-between items-center px-5 py-3">
        <div className="flex justify-between items-center">
          <img
            className="h-10 rounded-full cursor-pointer"
            src="https://ui-avatars.com/api/&background=4d148c&color=fff&name=S"
            alt="avatar"
          />
          <p className="ml-3 text-base font-medium">{currentContact?.name}</p>
        </div>
        <div className="flex text-gray-400">
          <SearchIcon />
          <span className="ml-4">
            <MenuDotIcon />
          </span>
        </div>
      </div>

      {/* chats */}
      <div className="relative flex-1">
        <div className="h-full w-full  z-10 bg-chat-bg bg-contain bg-repeat opacity-5"></div>
        <div className="absolute w-full top-0  px-20 py-5 flex flex-col space-y-1 overflow-y-auto">
          {messages.map((chat: any, index: number) => (
            <div
              key={index}
              className={`flex ${
                chat.sender !== userEmail ? "justify-start" : " justify-end"
              } `}
            >
              <div
                className={`${
                  chat.sender !== userEmail ? "bg-[#202c33]" : "bg-[#025d4b]"
                } py-0.5 px-3 rounded-md flex justify-between space-x-3`}
              >
                <div className="flex justify-center my-1 ">{chat.message}</div>
                <div
                  className={`text-xs ${
                    chat.sender !== userEmail
                      ? "text-gray-500 flex items-end"
                      : "flex items-end"
                  }`}
                >
                  <p>{chat?.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* messaging panel */}
      <div className="flex justify-between items-center py-2 px-5 bg-[#202c33]">
        <div className="flex text-gray-400 space-x-5">
          <EmojiMenuIcon />
          <ClipMenuIcon />
        </div>
        <div className="flex-1 px-5">
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
