/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import db, { auth } from "../utils/firebase";
import { CancelIcon, MenuDotIcon, MessageIcon } from "../utils/icons";
import Router from "next/router";
import {
  doc,
  serverTimestamp,
  query,
  addDoc,
  getDocs,
  collection,
  where,
  onSnapshot,
} from "firebase/firestore";

interface IAddChatModal {
  userEmail?: string;
  setAddChatModalStatus: (data: boolean) => void;
}

const AddChatModal = ({
  userEmail = "",
  setAddChatModalStatus = () => null,
}: IAddChatModal) => {
  const [emailId, setEmailId] = useState("");

  const handleAddChat = async () => {
    //check empty string
    if (!emailId) alert("Please enter user email");

    //check user have account
    const userRef = collection(db, "users");
    const userChats = query(userRef, where("email", "==", `${emailId}`));
    const contactInfo: any = (await getDocs(userChats)).size;
    if (!contactInfo) {
      alert(
        `User account not found!, please tell ${emailId} to create account`
      );
      return;
    }

    const data = [userEmail, emailId];
    await addDoc(collection(db, "chats"), {
      users: data,
      lastMessage: "",
      lastMessageTimestamp: serverTimestamp(),
    })
      .then((res) => {
        setAddChatModalStatus(false);
      })
      .catch((err) => alert("Something went wrong!"));
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className=" fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-30 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0 ">
          <div className="flex flex-col items-stretch bg-[#0b141a] rounded-lg px-3 text-[#e9edef]  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-md sm:w-full ">
            {/* heading */}
            <div className="w-full py-2 border-b border-gray-700 flex justify-between items-center">
              <p className="text-lg">Add Chat</p>
              <span
                className="cursor-pointer"
                onClick={() => setAddChatModalStatus(false)}
              >
                <CancelIcon />
              </span>
            </div>
            <div className="my-3 space-y-3">
              <input
                className="w-full rounded-md bg-[#2a3942] py-2 px-3 focus:border-none active:border-none outline-none"
                placeholder="Email Address"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>
            <div className="w-full flex justify-end border-t border-gray-700 py-2 space-x-2">
              <button
                type="button"
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#2a3942] hover:bg-[#2a3942] focus:outline-none "
                onClick={() => setAddChatModalStatus(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-[#35897E] hover:bg-[#258477] focus:outline-none 
                  ${!emailId ? "cursor-not-allowed" : ""}
                `}
                onClick={() => {
                  if (emailId) handleAddChat();
                }}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ loggedUser }: any) => {
  const [addChatModalStatus, setAddChatModalStatus] = useState(false);
  const [contacts, setContacts] = useState<any>([]);

  const userEmail =
    typeof window !== "undefined" &&
    localStorage.getItem("WAW-Clone-userEmail");

  const getContactsData = async () => {

    //get all the chats which contain current logged in user
    const chatRef = collection(db, "chats");
    const contactsQuery = query(
      chatRef,
      where("users", "array-contains", userEmail)
    );

    const messageSnapShot = await onSnapshot(contactsQuery, (querySnapshot) => {
      const contactsInfo: any = [];
      querySnapshot.forEach((contactDetails) => {
        const contactsData = contactDetails.data();
        contactsInfo.push({
          _id: contactDetails.id,
          avatar: `https://ui-avatars.com/api/&background=4d148c&color=fff&name=${
            contactsData.users[1].split("@")[0]
          }`,
          name: contactsData.users[1].split("@")[0],
          lastMessage: contactsData?.lastMessage || "",
          lastMessageTimeStamp:
            new Date(
              contactsData?.lastMessageTimeStamp?.seconds * 1000
            )?.toLocaleTimeString() || "",
        });
      });

      setContacts([...contactsInfo]);
    });
  };

  useEffect(() => {
    getContactsData();
  }, []);

  const handleSignOut = () => {
    signOut(auth).then((res) => {
      Router.push({ pathname: "/" });
      localStorage.removeItem("WAW-Clone-userEmail");
    });
  };

  const handleRedirectToChat = (id: any) => {
    Router.push({ pathname: `/chat/${id}` });
  };

  return (
    <div className="h-full flex-[30%] border-r border-gray-700 flex flex-col">
      {addChatModalStatus && (
        <AddChatModal
          userEmail={userEmail || ""}
          setAddChatModalStatus={setAddChatModalStatus}
        />
      )}

      {/* nav */}
      <div className="bg-[#202c33] h-16 flex justify-between items-center px-5 py-3">
        <div>
          <img
            className="h-10 rounded-full cursor-pointer"
            src="https://ui-avatars.com/api/&background=4d148c&color=fff&name=S"
            alt="avatar"
            onClick={handleSignOut}
          />
        </div>
        <div className="flex text-gray-300">
          <MessageIcon />
          <span className="ml-7">
            <MenuDotIcon />
          </span>
        </div>
      </div>

      {/* add chat button */}
      <div className="border border-gray-700 w-full p-2">
        <button
          className="py-2 rounded-md w-full flex justify-center text-[#e9edef] bg-[#35897E] font-normal "
          onClick={() => setAddChatModalStatus(true)}
        >
          Start New Chat
        </button>
      </div>

      {/* chats */}
      <div className="flex-grow  overflow-y-auto bg-[#111b21]">
        {contacts.map((contact: any, index: number) => (
          <div
            key={`chat-${index}`}
            className="w-full cursor-pointer flex px-3 hover:bg-[#202c33]"
            onClick={() => {
              handleRedirectToChat(contact._id);
            }}
          >
            <div className="py-2">
              <img
                className="h-12 w-12 rounded-full"
                src={`${contact.avatar}`}
                alt="1"
              />
            </div>
            <div className="flex-1 flex items-start ml-3 py-3  border-b border-gray-700">
              <div className="flex-1 flex justify-start flex-col">
                <p className="text-[#e9edef] text-base">{`${contact.name}`}</p>
                <p className="text-sm text-gray-500">{`${contact.lastMessage}`}</p>
              </div>
              <div className="text-gray-500">
                <p className="text-sm">{`${contact.lastMessageTimeStamp}`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
