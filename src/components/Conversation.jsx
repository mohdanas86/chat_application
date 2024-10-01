import React, { useEffect } from "react";
import { useAuthcontext } from "../context/auth.context";

const Conversation = () => {
  const {
    userConversation,
    selectedConversation,
    setSelectedConversation,
    fetchMessages,
    currentId,
    setCurrentId,
  } = useAuthcontext();

  const handleCurrentUser = (conversation) => {
    setSelectedConversation(conversation);
    setCurrentId(conversation._id);
    fetchMessages();
  };


  return (
    <>
      {userConversation && userConversation.length > 0 ? (
        userConversation.map((v, i) => {
          const isSelected = selectedConversation?._id === v._id; // Check if the current conversation is selected

          return (
            <div
              className={`peopleChatItem w-full flex justify-around items-center px-4 py-3 gap-3 cursor-pointer border-b-[2px] duration-300 ${
                isSelected ? "bg-blue-100 border-b-0" : ""
              }`}
              key={i}
              onClick={() => handleCurrentUser(v)} // Pass the conversation object
            >
              {/* PROFILE IMAGE */}
              <div className="profileIcon avatar online w-[15%]">
                <div className="rounded-full">
                  <img
                    src={v.profilepic}
                    alt={v.fullname || "Profile"} // Added alt text for accessibility
                  />
                </div>
              </div>

              {/* PEOPLE CHAT DETAILS */}
              <div className="peopleChatDetails w-full flex flex-col justify-center items-start">
                <h4 className="font-semibold text-slate-800 text-sm capitalize">
                  {v.fullname}
                </h4>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center gap-4 mt-2">
          <div className="skeleton h-12 w-12 shrink-0 rounded-full"></div>
          <div className="flex w-full flex-col gap-6">
            <div className="skeleton h-4 w-full"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Conversation;
