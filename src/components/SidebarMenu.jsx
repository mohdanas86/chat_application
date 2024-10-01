import React from "react";
import { IoExitOutline } from "react-icons/io5";
import { useAuthcontext } from "../context/auth.context";

const SidebarMenu = () => {
  const { logout, authUser } = useAuthcontext();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      logout();
    }
  };

  return (
    <div className="sidemenu hidden lg:block bg-white shadow-lg shadow-[#cfdbf7] rounded-xl px-4 py-4">
      <div className="sideMenuBox h-full w-full mx-auto flex flex-col justify-between items-center">
        {/* PROFILE IMAGE */}
        <div className="profileIcon avatar online w-[80%] mx-auto">
          <div className="rounded-full">
            <img
              src={authUser.profilepic || "defaultProfilePicUrl"} // Fallback image
              alt="Profile"
            />
          </div>
        </div>

        {/* MENU */}
        <ul className="menu p-0 gap-3 flex justify-center items-center bg-white">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </a>
          </li>
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </a>
          </li>
        </ul>

        {/* EXIT */}
        <ul className="menu p-0 flex justify-center items-center bg-white">
          <li onClick={handleLogout}>
            <a className="text-xl">
              <IoExitOutline />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarMenu;
