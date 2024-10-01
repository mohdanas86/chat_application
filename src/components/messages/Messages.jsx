import React, { useEffect, useRef } from "react";
import { useAuthcontext } from "../../context/auth.context";

const Messages = () => {
  const { authUser, currentUserMessages, selectedConversation } = useAuthcontext();
  const endOfMessagesRef = useRef(null); // Changed the ref name for clarity

  useEffect(() => {
    // Scroll to the bottom of the messages
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentUserMessages]); // Trigger effect when messages change

  return (
    <>
      {currentUserMessages &&
        currentUserMessages.map((message, index) => {
          const fromMe = message.senderId === authUser._id;
          const chatClassName = fromMe ? "chat-end" : "chat-start";
          const profilepic = fromMe
            ? authUser.profilepic
            : selectedConversation?.profilepic || "defaultProfilePicUrl"; // Fallback image
          const bubbleBgColor = fromMe
            ? "bg-blue-500 text-gray-100"
            : "bg-[#e1e3eb] text-slate-800";

          // Format the time to show only hours and minutes in 12-hour format
          const date = new Date(message.createdAt);
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // 12-hour format
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
              <div className="chat-footer opacity-50">
                {formattedTime}
              </div>
            </div>
          );
        })}
      {/* Reference to scroll to the bottom */}
      <div ref={endOfMessagesRef} />
    </>
  );
};

export default Messages;
