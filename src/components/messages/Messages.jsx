import React, { useEffect, useRef } from "react";
import { useAuthcontext } from "../../context/auth.context";
import { IoChatbubblesOutline } from "react-icons/io5";

const Messages = () => {
  const {
    authUser,
    currentUserMessages,
    selectedConversation,
    noMessage,
    setNoMessage,
  } = useAuthcontext();

  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the messages
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }

    // Handle the "no messages" logic
    if (!currentUserMessages || currentUserMessages.length === 0) {
      setNoMessage("No messages in this conversation.");
    } else {
      setNoMessage(""); // Reset noMessage if there are messages
    }

    console.log("no message:", noMessage);
  }, [currentUserMessages]);

  return (
    <>
      {currentUserMessages && currentUserMessages.length > 0 ? (
        currentUserMessages.map((message, index) => {
          const fromMe = message.senderId === authUser._id;
          const chatClassName = fromMe ? "chat-end" : "chat-start";
          const profilepic = fromMe
            ? authUser.profilepic
            : selectedConversation?.profilepic || "defaultProfilePicUrl";
          const bubbleBgColor = fromMe
            ? "bg-blue-500 text-gray-100"
            : "bg-[#e1e3eb] text-slate-800";

          const date = new Date(message.createdAt);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });

          return (
            <div key={index} className={`chat ${chatClassName}`}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={profilepic} />
                </div>
              </div>
              <div className={`chat-bubble ${bubbleBgColor}`}>
                {message.message}
              </div>
              <div className="chat-footer opacity-50">{formattedTime}</div>
            </div>
          );
        })
      ) : (
        <div className="NoMessage w-full grid grid-cols-1">
          <p className="text-center font-semibold text-2xl text-slate-500 mx-auto">
            {noMessage} Chat Now!
          </p>
          <div className="mx-auto text-4xl text-slate-500 mt-6">
            <IoChatbubblesOutline />
          </div>
        </div>
      )}
      {/* Reference to scroll to the bottom */}
      <div ref={endOfMessagesRef} />
    </>
  );
};

export default Messages;
