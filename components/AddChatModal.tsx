import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import React, { useState } from "react";
import db from "../utils/firebase";
import { isValidEmail } from "../utils/helper";
import { CancelIcon } from "../utils/icons";
import Alert, { IAlert } from "./Alert";

interface IAddChatModal {
  userData?: { [key: string]: string };
  setAddChatModalStatus: (data: boolean) => void;
}

const defaultAlert: IAlert = {
  type: "error",
  title: "",
  subTitle: "",
};

const AddChatModal = ({
  userData = {},
  setAddChatModalStatus = () => null,
}: IAddChatModal) => {
  const [emailId, setEmailId] = useState("");
  const [alert, setAlert] = useState<IAlert>({
    ...defaultAlert,
  });

  const handleAddChat = async () => {
    //check empty string
    if (!emailId)
      setAlert({
        ...alert,
        title: "Please enter user email",
      });

    //check email is valid
    const validEmail = isValidEmail(emailId);
    if (!validEmail) {
      setAlert({
        ...alert,
        title: "Please enter valid email address!",
      });
      return;
    }

    //check user have account
    const userRef = collection(db, "users");
    const userChats = query(userRef, where("email", "==", `${emailId}`));
    const contactSnap: any = await getDocs(userChats);
    if (!contactSnap?.size) {
      setAlert({
        ...alert,
        title: `User account not found!`,
        subTitle: `please tell ${emailId} to create account`,
      });
      return;
    }
    let contactData: any = {};
    contactSnap.forEach((contact: any) => {
      let data = contact?.data();
      contactData = {
        ...data,
      };
    });
    const usersdata = [userData?.email, emailId];
    const data = {
      users: usersdata || [],
      metaData: [
        {
          email: userData?.email || "",
          displayName: userData?.displayName || "",
          avatar: userData?.avatar || "",
        },
        {
          email: contactData?.email || "",
          displayName: contactData?.displayName || "",
          avatar: contactData?.avatar || "",
        },
      ],
      lastMessage: "",
      lastMessageTimestamp: serverTimestamp(),
    };
    await addDoc(collection(db, "chats"), data)
      .then((res) => {
        setAddChatModalStatus(false);
      })
      .catch((err) => setAlert(err.message));
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {alert.title && (
        <Alert
          title={alert.title}
          subTitle={alert.subTitle}
          type={alert.type}
          onClose={() => setAlert({ ...defaultAlert })}
        />
      )}
      <div className=" fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-30 inset-0 overflow-y-auto">
        <div className="flex items-center sm:items-center justify-center min-h-full p-4 text-center sm:p-0 ">
          <div className="flex flex-col items-stretch bg-[#0b141a] rounded-lg px-3 text-[#e9edef]  text-left overflow-hidden shadow-xl transform transition-all sm:my-8 w-full sm:max-w-md sm:w-full ">
            {/* heading */}
            <div className="w-full py-2 border-b border-gray-700 flex justify-between items-center">
              <p className="text-lg">Contact Email Address</p>
              <span
                className="cursor-pointer"
                onClick={() => setAddChatModalStatus(false)}
              >
                <CancelIcon />
              </span>
            </div>
            <div className="my-5">
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
export default AddChatModal;
