import React from "react";
import { useAuthcontext } from "../context/auth.context";

const Header = () => {
  const { authUser, currentId, mobileChat } = useAuthcontext();
  return (
    <div
      className={`lg:hidden w-full fixed top-0 left-0 bg-white py-3 px-4 border-b shadow-sm z-50`}
    >
      <div className="phoneLogo w-full flex items-center justify-start h-10 placeholder-opacity-40">
        <h2 className="text-xl font-bold capitalize text-slate-700">
          chatStom
        </h2>
      </div>
    </div>
  );
};

export default Header;
