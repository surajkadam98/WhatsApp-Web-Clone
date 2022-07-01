/* eslint-disable @next/next/no-img-element */
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import db, { auth } from "../utils/firebase";
import { MenuDotIcon, MessageIcon } from "../utils/icons";
import Router from "next/router";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import AddChatModal from "./AddChatModal";
import { IAlert } from "./Alert";

const defaultAlert: IAlert = {
  type: "error",
  title: "",
  subTitle: "",
};

const Sidebar = ({ loggedUser }: any) => {
  const [addChatModalStatus, setAddChatModalStatus] = useState(false);
  const [contacts, setContacts] = useState<any>([]);
  const [alert, setAlert] = useState<IAlert>({
    ...defaultAlert,
  });

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

    // chat contacts listener
    const messageSnapShot = await onSnapshot(contactsQuery, (querySnapshot) => {
      const contactsInfo: any = [];
      querySnapshot.forEach((contactDetails) => {
        const contactsData = contactDetails.data();
        const localTimeStamp =
          new Date(
            contactsData?.lastMessageTimeStamp?.seconds * 1000
          )?.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }) || "";
        contactsInfo.push({
          _id: contactDetails.id,
          avatar: `https://ui-avatars.com/api/&background=4d148c&color=fff&name=${
            contactsData.users[1].split("@")[0]
          }`,
          name: contactsData.users[1].split("@")[0],
          lastMessage: contactsData?.lastMessage || "",
          lastMessageTimeStamp: localTimeStamp,
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
      {/* add new chat modal */}
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

      {/* contacts */}
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
