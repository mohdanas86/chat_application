import React from 'react'
import Chat from '../components/Chat'
import ChatSideBar from '../components/ChatSideBar'
import SidebarMenu from '../components/SidebarMenu'

import "../App.css"

const Home = () => {
  return (
    <div className="container w-full h-screen lg:gap-6 lg:p-8 bg-[#EFF6FC]" id="register">
      <SidebarMenu />
      <ChatSideBar />
      <Chat />
    </div>
  )
}

export default Home