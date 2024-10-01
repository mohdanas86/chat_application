import React, { useState } from "react";
import "../App.css";
import Messages from "./messages/Messages";
import MessageInput from "./messages/MessageInput";

import { TbMessages } from "react-icons/tb";
import ChatNav from "./ChatNav";
import { useAuthcontext } from "../context/auth.context";

const Chat = () => {
  const { conversation, selectedConversation, setSelectedConversation } = useAuthcontext();

  return (
    <div
      className={`chatBox bg-white lg:shadow-lg lg:shadow-[#cfdbf7] lg:rounded-xl lg:border pt-4 md:p-6 lg:p-4 overflow-hidden relative w-full mx-auto ${
        conversation ? "hidden lg:block" : "block"
      }`}
    >
      <div className="chatContainer h-[calc(100vh-12rem)] flex flex-col">
        {/* CHAT NAVBAR */}
        <ChatNav selectedConversation={selectedConversation} />

        {/* MESSAGES CONTAINER */}
        {selectedConversation ? (
                    <div className="messageScrollCon h-[calc(100vh-7.5rem)] lg:h-[calc(100vh-13rem)] flex flex-col w-full gap-2 px-4 lg:px-0">
                    <div className="messageCon  py-4 overflow-y-scroll">
                      <Messages />
                    </div>
                  </div>
        ) : (
          <WelcomeModelContainer />
        )}

        {/* MESSAGE INPUT */}
        <MessageInput />
      </div>
    </div>
  );
};

export const WelcomeModelContainer = () => {
  return (
    <>
      {/* WELCOME MESSAGE */}
      <div className="messageScrollCon flex-1 flex flex-col w-full gap-2 overflow-hidden">
        <div className="messageCon flex-1 py-4">
          <div className="card w-full h-full flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center mb-8">
              <h2 className="card-title font-semibold">Welcome to <span>Chat<span className="text-blue-500  font-bold">Stom</span></span></h2>
              <p>Select a chat to start a conversation</p>
            </div>
            <div className="w-full mx-auto flex justify-center items-center">
              <TbMessages className="text-[10rem]" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
