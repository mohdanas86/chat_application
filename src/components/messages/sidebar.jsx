import React, { useState } from "react";
import Conversation from "./Conversation";
import Search from "./Search";
import { useAuthcontext } from "../context/auth.context";
import ChatNav from "./ChatNav";
import Header from "./Header";
import PhoneFooterNav from "./PhoneFooterNav";

const ChatSideBar = () => {
  const { conversation, mobileChat } = useAuthcontext();
  return (
    <>
      <div
        className={`sidebar  px-6 relative h-screen overflow-hidden
          ${mobileChat ? "hidden lg:block" : "block"} 
          lg:block bg-white shadow-lg shadow-[#cfdbf7] lg:rounded-xl py-4 lg:border overflow-hidden`}
      >
          {/* PHONE LOGO */}
          <Header />
        <div className="sidebarItmes flex justify-center items-center flex-col gap-4 mt-16 lg:mt-0">
          {/* SEARCHBAR */}
          <Search />

          {/* CHATS */}
          <div className="peopleChat flex justify-center items-start flex-col w-full gap-2 lg:mt-0 mt-3">
            {/* <h4 className="font-semibold text-slate-700 text-xl lg:mb-0 mb-2">People</h4> */}
            {/* <div className="conversationScrollCon flex justify-start items-start flex-col w-full gap-2"> */}
            <div className=" border border-red-500 h-[40%]">
              <div className="peopleChatItems gap-6 w-full border">
                <Conversation />
              </div>
            </div>
          </div>
        </div>
          {/* PHONE LOGO */}
          <PhoneFooterNav />
      </div>
    </>
  );
};

export default ChatSideBar;
