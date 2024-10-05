import React from "react";
import { IoExitOutline } from "react-icons/io5";
import { useAuthcontext } from "../context/auth.context";

import { IoSearch } from "react-icons/io5";

const PhoneFooterNav = () => {
  const { logout, showSearch, setShowSearch } = useAuthcontext();

  return (
    <div className="lg:hidden w-full fixed bottom-0 left-0 bg-white py-2 px-4 border-t shadow-sm z-50">
      <div className="sidemenu  w-full max-w-screen-lg mx-auto rounded-xl px-4 py-2">
        <div className="sideMenuBox h-full w-full flex justify-between items-center">
          {/* MENU */}
          <ul className="menu w-full p-0 gap-3 flex-row justify-between items-center bg-white">
            <li>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </a>
            </li>
            <li onClick={(e) => setShowSearch((e) => !e)}>
              <a className=" text-xl">
                <IoSearch />
              </a>
            </li>
            <li onClick={logout}>
              <a className="text-xl">
                <IoExitOutline />
              </a>
            </li>
          </ul>

          {/* EXIT */}
          {/* <ul className="menu p-0 flex justify-center items-center bg-white">
            <li onClick={logout}>
              <a className="text-xl">
                <IoExitOutline />
              </a>
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default PhoneFooterNav;
