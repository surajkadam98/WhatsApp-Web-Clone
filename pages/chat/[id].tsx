import React from "react";
import ChatWindow from "../../components/ChatWindow";
import Login from "../../components/Login";
import Sidebar from "../../components/Sidebar";
import styles from "../../styles/Home.module.css";

const Chat = () => {
  const userEmail =
    typeof window !== "undefined" &&
    localStorage.getItem("WAW-Clone-userEmail");

  if (!userEmail) return <Login />;

  return (
    <div className={`bg-[#0a1015]`}>
      <main
        className={`${styles.main} max-w-[90rem] mx-auto  2xl:py-5 2xl:px-10`}
      >
        <div className="h-full w-full  flex">
          <Sidebar />
          <div className="h-full flex-[70%] bg-[#212e35] flex justify-center items-center">
            <ChatWindow />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
