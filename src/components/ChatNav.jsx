import React, { useEffect, useState } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { useAuthcontext } from "../context/auth.context";

const ChatNav = ({selectedConversation}) => {
  const { logout, setTogalMenu, authUser, setConversation } =
    useAuthcontext();

  return (
    <div>
      <div className={`chatNav justify-between items-center border-b-2 pb-4 lg:px-0 px-4 duration-300 ${!selectedConversation ? " hidden" : "flex"}`}>
       {selectedConversation ? ( <div className="flex justify-start items-center gap-2 lg:gap-4">
          {/* PROFILE IMAGE */}
          <div className="profileIcon avatar online w-[10%] lg:w-[30px]">
            <div className="rounded-full">
              <img src={selectedConversation?selectedConversation.profilepic:"pic"} alt="profile image" />
            </div>
          </div>

          <span className="font-semibold text-slate-700 text-sm pl-2 capitalize">
            {selectedConversation?selectedConversation.fullname:"name"}
          </span>
        </div>) : ("")}

        {/* MENU ICON */}
        <div
          className="dropdown lg:hidden"
          onClick={(e) => setTogalMenu((e) => !e)}
        >
          <div
            tabIndex={0}
            role="button"
            className="flex justify-center items-center text-lg cursor-pointer"
          >
            <BsThreeDotsVertical />
          </div>

          <ul
            tabIndex={0}
            className="dropdown-content menu bg-white rounded-lg z-[1] w-[10rem] py-4  border shadow-lg top-6 right-0"
          >
            <li>
              <a onClick={(e) => setConversation((e) => !e)}>Home</a>
            </li>
            <li className="lg:hidden" onClick={logout}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChatNav;
