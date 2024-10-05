import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthcontext } from "../context/auth.context";
import Loding from "./Loding";

const Conversation = () => {
  const [load, setLoad] = useState(false);
  const [lastMessages, setLastMessages] = useState({}); // Use an object to store last messages with id and createdAt
  const {
    userConversation,
    selectedConversation,
    setSelectedConversation,
    setCurrentId,
    currentId,
    mobileChat,
    setMobileChat,
  } = useAuthcontext();

  const handleCurrentUser = (conversation) => {
    if (selectedConversation?._id !== conversation._id) {
      setCurrentId(conversation._id);
      setMobileChat(true);
      setSelectedConversation(conversation);
    }
  };

  // Function to convert date string to 12-hour format
  const convertTo12HourFormat = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12; // Convert to 12-hour format
    hours = hours ? hours : 12; // The hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  // UseEffect for fetching message data
  // const fetchMessages = async () => {
  //   try {
  //     const messages = {}; 
  
  //     for (let i = 0; i < userConversation.length; i++) {
  //       const res = userConversation[i];
  //       const url = `http://localhost:4000/api/message/${res._id}`;
  
  //       try {
  //         const response = await axios.get(url, { withCredentials: true });
  //         const array = response.data.conversation;
  //         const lastItem = array[array.length - 1];
  
  //         if (lastItem) {
  //           const lastMessageTime = convertTo12HourFormat(lastItem.createdAt);
  //           messages[res._id] = {
  //             id: lastItem._id,
  //             message: lastItem.message,
  //             createdAt: lastMessageTime, 
  //           };
  //         } else {
            
  //           messages[res._id] = {
  //             id: null,
  //             message: "", 
  //             createdAt: "", 
  //           };
  //         }
  //       } catch (error) {
         
  //         console.error(`Error fetching messages for conversation ${res._id}:`, error.response ? error.response.data.message : error.message);

  //         messages[res._id] = {
  //           id: null,
  //           message: "", 
  //           createdAt: "", 
  //         };
  //       }
  //     }
  
  //     setLastMessages(messages); 
  //   } catch (error) {
  //     console.error("Error fetching messages:", error);
  //   }
  // };
  
  const fetchMessages = async () => {
    setLoad(true)
    try {
      const messages = {}; // Temporary object to hold last messages, createdAt, and ids for each conversation
  
      for (let i = 0; i < userConversation.length; i++) {
        const res = userConversation[i];
        const url = `http://localhost:4000/api/message/${res._id}`;
  
        try {
          const response = await axios.get(url, { withCredentials: true });
          const array = response.data.conversation;
          const lastItem = array[array.length - 1]; // Get the last message
  
          if (lastItem) {
            const lastMessageTime = convertTo12HourFormat(lastItem.createdAt); // Convert createdAt to 12-hour format
            messages[res._id] = {
              id: lastItem._id, // Store the message id
              message: lastItem.message, // Store the last message
              createdAt: lastMessageTime, // Store the createdAt in 12-hour format
            };
          } else {
            // If no messages, set an empty message object for that conversation ID
            messages[res._id] = {
              id: null,
              message: "No messages yet", // Placeholder message indicating no messages
              createdAt: "", // Empty createdAt
            };
          }
        } catch (error) {
          // Log the error for this specific conversation, but continue the loop
          // console.error(`Error fetching messages for conversation ${res._id}:`, error.response ? error.response.data.message : error.message);
          
          // Assign an empty message object if there's an error while fetching messages
          messages[res._id] = {
            id: null,
            message: "chat now", // Indicate an error in fetching messages
            createdAt: "", // Empty createdAt
          };
        }
      }
  
      setLastMessages(messages); // Update state with all last messages, ids, and createdAt
    } catch (error) {
      // console.error("Error fetching messages:", error);
    }finally{
      setLoad(false)
    }
  };
  

  useEffect(() => {
    if (userConversation && userConversation.length > 0) {
      fetchMessages();
    }
  }, [userConversation]); // Fetch messages whenever userConversation changes

  return (
    <>
      {userConversation ? (
        userConversation.length > 0 ? (
          userConversation.map((conversation) => {
            const isSelected = selectedConversation?._id === conversation._id;
            const lastMessageData = lastMessages[conversation._id] || {}; // Get last message data for the current conversation
            const lastMessage = lastMessageData.message || ""; // Last message text
            const lastMessageTime = lastMessageData.createdAt || ""; // Last message createdAt (12-hour format)

            return (
              <div
                className={`peopleChatItem w-full flex justify-around items-center lg:px-4 py-3 lg:py-2 lg:gap-4 gap-4 cursor-pointer lg:border-b-[1.5px] duration-300 ${
                  isSelected ? "lg:bg-blue-100 lg:border-b-0" : ""
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
                  {/* Display the createdAt time */}
                  <div className="flex justify-between items-center w-full">
                    <p className="text-sm capitalize text-slate-600">
                      {lastMessage}
                    </p>
                    <span className="text-slate-500 text-xs">
                      {lastMessageTime}
                    </span>
                  </div>
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
        )
      ) : (
        <Loding />
      )}
    </>
  );
};

export default Conversation;
