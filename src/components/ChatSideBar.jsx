import React from "react";
import Conversation from "./Conversation";
import Search from "./Search";
import { useAuthcontext } from "../context/auth.context";
import Header from "./Header";
import PhoneFooterNav from "./PhoneFooterNav";

const ChatSideBar = () => {
  const { mobileChat, showSearch, setShowSearch } = useAuthcontext();

  return (
    <div
      className={`sidebar px-6 relative h-screen lg:h-auto
        ${mobileChat ? "hidden lg:block" : "block"}
        lg:block bg-white shadow-lg shadow-[#cfdbf7] lg:rounded-xl py-4 lg:border`}
    >
      {/* HEADER */}
      <Header />

      {/* Main Sidebar Content */}
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col justify-start items-center h-[85%] lg:h-[100%] w-full mt-[14%] lg:mt-0">

          {/* Search Bar + Conversations */}
          <div className=" hidden lg:block w-full">
          <Search />
          </div>

          <div
            className={`${
              showSearch ? "block" : "hidden"
            } lg:hidden absolute left-0 top-[-0px] w-full z-50 bg-white border-b p-4`}
          >
            <Search />
          </div>

          {/* Chat list - scrollable */}
          <div className="scrollBarNo flex-grow w-full mt-4">
            {/* <div className="w-full"> */}
            <Conversation />
            {/* </div> */}
          </div>
        </div>

        {/* Footer */}
        <div className="h-[0%]">
          <PhoneFooterNav />
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
