/* eslint-disable @next/next/no-img-element */
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import db, { auth } from "../utils/firebase";
import { MenuDotIcon, MessageIcon } from "../utils/icons";
import Router from "next/router";
import {
  query,
  collection,
  where,
  onSnapshot,
  doc,
  setDoc,
} from "firebase/firestore";
import AddChatModal from "./AddChatModal";
import {
  getContactEmail,
  getLoggedUserData,
  randomColorGenerator,
  timeSince,
} from "../utils/helper";

const Sidebar = ({ loggedUser }: any) => {
  const [addChatModalStatus, setAddChatModalStatus] = useState(false);
  const [islogoutPopVisible, setIslogoutPopVisible] = useState(false);
  const [selectedContact, setSelectedContact] = useState("");
  const [contacts, setContacts] = useState<any>([]);

  let userData = getLoggedUserData();

  useEffect(() => {
    const chatRef = collection(db, "chats");
    const contactsQuery = query(
      chatRef,
      where("users", "array-contains", userData?.email)
    );

    // chat contacts listener
    const unsuscribe = onSnapshot(contactsQuery, (querySnapshot) => {
      const contactsInfo: any = [];
      querySnapshot.forEach(async (contactDetails) => {
        const contactsData = contactDetails.data();
        const timeStamp =
          timeSince(contactsData?.lastMessageTimeStamp?.seconds * 1000) || "";

        const displayLastmessage =
          contactsData?.lastMessage.length > 20
            ? `${contactsData?.lastMessage?.substring(0, 25)} ...`
            : contactsData?.lastMessage;

        const contactData = getContactEmail(contactsData, userData?.email);

        contactsInfo.push({
          _id: contactDetails.id,
          avatar:
            contactData?.avatar ||
            `https://ui-avatars.com/api/&background=${randomColorGenerator()}&color=fff&name=${
              contactData?.displayName
            }`,
          email: contactData?.email,
          name: contactData?.displayName || contactData?.email?.split("@")[0],
          lastMessage: `${displayLastmessage}` || "",
          lastMessageTimeStamp: timeStamp,
        });
      });

      setContacts([...contactsInfo]);
    });

    return () => {
      unsuscribe();
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth).then((res) => {
      Router.push({ pathname: "/" });
      const userRef = doc(db, "users", `${userData?._id}`);
      setDoc(
        userRef,
        {
          activeStatus: false,
        },
        { merge: true }
      );
      localStorage.removeItem("WAW-Clone-userData");
    });
  };

  const handleRedirectToChat = (id: any) => {
    Router.push({ pathname: `/chat/${id}` });
  };

  return (
    <div className="h-full w-full border-r border-gray-700 flex flex-col">
      {/* add new chat modal */}
      {addChatModalStatus && (
        <AddChatModal
          userData={userData || ""}
          setAddChatModalStatus={setAddChatModalStatus}
        />
      )}

      {/* nav */}
      <div className="bg-[#202c33] h-16 flex justify-between items-center px-5 py-3">
        <div className="flex items-center">
          <img
            className="h-10 w-10 rounded-full cursor-pointer"
            src={
              userData?.avatar ||
              `https://ui-avatars.com/api/&background=${randomColorGenerator()}&color=fff&name=${
                userData?.email
              }`
            }
            alt="avatar"
            onClick={handleSignOut}
          />
          <p className="flex items-center ml-2 md:hidden text-lg font-semibold text-gray-400">
            Wassup!
          </p>
        </div>
        <div className="flex relative text-gray-300 cursor-pointer">
          <span onClick={() => setAddChatModalStatus(true)}>
            <MessageIcon />
          </span>
          <span
            className="ml-5 relative group"
            onClick={() => setIslogoutPopVisible(!islogoutPopVisible)}
          >
            <MenuDotIcon />
          </span>
          <span
            className={`${
              islogoutPopVisible ? "absolute" : "hidden"
            } -right-0 -bottom-12 rounded-md p-2 px-5 bg-[#111b21] cursor-pointer  `}
            onClick={handleSignOut}
          >
            <p>logout</p>
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
            className={`w-full cursor-pointer flex items-center px-3 ${
              selectedContact === contact?._id && "bg-[#2a3942]"
            } hover:bg-[#202c33]`}
            onClick={() => {
              setSelectedContact(contact._id);
              handleRedirectToChat(contact._id);
            }}
          >
            <div className="py-2">
              <img
                className="h-11 w-11 rounded-full"
                src={`${contact.avatar}`}
                alt="1"
              />
            </div>
            <div
              className={`flex-1 flex items-start ml-3 py-3  border-b border-gray-700 ${
                selectedContact === contact?._id
                  ? "text-gray-200"
                  : "text-gray-400"
              }`}
            >
              <div className="flex-1 flex justify-start flex-col">
                <p className="text-[#e9edef] text-base">{`${
                  contact.name || ""
                }`}</p>
                <p className="text-sm ">{`${contact.lastMessage || ""}`}</p>
              </div>
              <div className="">
                <p className="text-sm">{`${
                  contact.lastMessageTimeStamp || ""
                }`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
