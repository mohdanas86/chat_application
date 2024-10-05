import React from "react";
import Chat from "../components/Chat";
import ChatSideBar from "../components/ChatSideBar";
import SidebarMenu from "../components/SidebarMenu";

import "../App.css";
import { useAuthcontext } from "../context/auth.context";

const Home = () => {
  const { mobileChat, setMobileChat } = useAuthcontext();
  return (
    <div className="container w-full h-screen lg:gap-6 lg:p-8">
      <SidebarMenu />
      <ChatSideBar />
      <Chat />
    </div>
  );
};

export default Home;
