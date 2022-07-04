import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import Router from "next/router";
import React, { useState } from "react";
import db, { auth, provider } from "../utils/firebase";
import { GoogleIcon } from "../utils/icons";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import Alert, { IAlert } from "./Alert";

const defaultAlert: IAlert = {
  type: "error",
  title: "",
  subTitle: "",
};

const Login = () => {
  const [alert, setAlert] = useState({ ...defaultAlert });

  const handleSignin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        if (res.user) {
          const { user } = res;
          const data = {
            _id: user.uid, //not necessary
            email: user.email,
            displayName: user.displayName,
            avatar: user.photoURL,
            lastSeen: serverTimestamp(),
            activeStatus: true,
          };
          const usersRef = doc(db, "users", user.uid);
          const userData = {
            _id: data?._id || "",
            email: data?.email || "",
            avatar: data?.avatar || "",
            displayName: data?.displayName,
          };
          localStorage.setItem("WAW-Clone-userData", JSON.stringify(userData));
          setDoc(usersRef, data, { merge: true });
          setAlert({ ...defaultAlert });
        }
        Router.push({ pathname: "/chat" });
      })
      .catch((err) => {
        setAlert({
          ...alert,
          title: err.message,
        });
        localStorage.removeItem("WAW-Clone-userData");
      });
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden">
      {alert.title && (
        <Alert
          title={alert.title}
          type={alert.type}
          onClose={() => setAlert({ ...defaultAlert })}
        />
      )}
      <div className="flex flex-col h-full w-full relative">
        <div className="w-full h-56 bg-login-green">
          {/* logo */}
          <div className="absolute left-9 lg:left-52 py-7 flex justify-start">
            <div className="flex justify-center items-center space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="39"
                height="39"
                viewBox="0 0 39 39"
              >
                <path
                  fill="#00E676"
                  d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
                ></path>
                <path
                  fill="#FFF"
                  d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
                ></path>
              </svg>
              <p className="text-white font-bold text-sm">WHATSAPP WEB</p>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-app-dark"></div>
        {/* modal */}
        <div className=" absolute top-[25rem]  m:-bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50  w-full">
          <div className="bg-white max-w-3xl lg:max-w-4xl mx-9 md:mx-auto  p-10 md:p-16 rounded-sm text-app-text-gray flex flex-col sm:flex-row md:justify-between ">
            <div className="flex flex-col items-center md:items-start ">
              <p className="text-2xl lg:text-3xl font-light mb-5 lg:mb-10">
                WhatsApp Web Clone:
              </p>
              <ul className="ml-1 space-y-4 mb-7 text-md lg:text-lg">
                <li>1. Login/Logout using gmail account</li>
                <li>2. Add contact using their gmail id</li>
                <li>3. Real time active status and chat</li>
              </ul>
              <a className="text-md lg:text-lg text-teal-700 cursor-not-allowed">
                Need help to get started?
              </a>
            </div>

            <div className=" md:mx-auto md:m-0 md:-mt-5 flex flex-col items-center justify-center">
              <div className="hidden sm:block rounded-md shadow-md mb-5">
                <Image src={"/tech.png"} width={300} height={300} alt="temp" />
              </div>
              <button
                onClick={() => {
                  if (alert.title) return;
                  handleSignin();
                }}
                disabled={alert.title ? true : false}
                className={`mt-5 md:mt-0 py-2 w-full md:w-3/4 h-14  flex justify-center items-center rounded-full font-bold border-2 border-gray-200 mb-3
                  ${alert.title && "opacity-60 cursor-not-allowed"}
                `}
              >
                <GoogleIcon classes="h-6 w-6" />
                <p className="ml-2 text-gray-500">Continue with Google</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
