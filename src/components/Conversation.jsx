import React from "react";
import { useAuthcontext } from "../context/auth.context";

const Conversation = () => {
  const {
    userConversation,
    selectedConversation,
    setSelectedConversation,
    currentId,
    setCurrentId,
  } = useAuthcontext();

  const handleCurrentUser = (conversation) => {
    if (selectedConversation?._id !== conversation._id) {
      setCurrentId(conversation._id);
      setSelectedConversation(conversation);
    }
  };

  return (
    <>
      {userConversation && userConversation.length > 0 ? (
        userConversation.map((conversation) => {
          const isSelected = selectedConversation?._id === conversation._id;

          return (
            <div
              className={`peopleChatItem w-full flex justify-around items-center px-4 py-3 gap-3 cursor-pointer border-b-[2px] duration-300 ${
                isSelected ? "bg-blue-100 border-b-0" : ""
              }`}
              key={conversation._id}
              onClick={() => handleCurrentUser(conversation)}
            >
              <div className="profileIcon avatar online w-[15%]">
                <div className="rounded-full">
                  <img
                    src={conversation.profilepic}
                    alt={conversation.fullname || "Profile"}
                  />
                </div>
              </div>
              <div className="peopleChatDetails w-full flex flex-col justify-center items-start">
                <h4 className="font-semibold text-slate-800 text-sm capitalize">
                  {conversation.fullname}
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
