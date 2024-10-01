import React, { useState } from "react";
import Conversation from "./Conversation";
import Search from "./Search";
import { useAuthcontext } from "../context/auth.context";
import ChatNav from "./ChatNav";

const ChatSideBar = () => {
  const { conversation } = useAuthcontext();
  return (
    <>
      <div
        className={`sidebar  px-6 ${
          !conversation ? "hidden" : "block"
        } lg:block bg-white shadow-lg shadow-[#cfdbf7] lg:rounded-xl py-4 lg:border overflow-hidden`}
      >
        <div className="sidebarItmes flex justify-center items-center flex-col gap-4 ">
          {/* SEARCHBAR */}
          <Search />

          {/* CHATS */}
          <div className="peopleChat flex justify-center items-start flex-col w-full  gap-2">
            <h4 className="font-semibold text-slate-700">People</h4>
            <div className="conversationScrollCon flex justify-start items-start flex-col w-full gap-2">
              <div className="peopleChatItems gap-4 overflow-scroll w-full">
                <Conversation />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSideBar;
