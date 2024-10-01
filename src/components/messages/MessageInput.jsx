import React, { useState } from "react";
import axios from "axios";

import { MdSend } from "react-icons/md";
import { useAuthcontext } from "../../context/auth.context";

const MessageInput = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    authUser,
    currentId,
    setCurrentId,
    fetchMessages
  } = useAuthcontext();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const url = `http://localhost:4000/api/message/66e9260d2fff780b9d541d96`;
      // const url = `http://localhost:4000/api/message/send/${selectedConversation._id}`;
      const url = `http://localhost:4000/api/message/send/${currentId}`;
      console.log(url);
      const response = await axios.post(
        url,
        { message },
        { withCredentials: true }
      );
      if (response) {
        setMessage(""); // Clear the message input after sending
        fetchMessages(); // Fetch messages after sending
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="messageInputCon w-full bg-white absolute bottom-2 left-0">
      <div className="messageInputBox flex justify-center items-center flex-col gap-4 text-black rounded-xl py-2 w-[95%] mx-auto">
        {/* SEARCHBAR */}
        <form className="seachBar w-full" onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 bg-[#EFF6FC] outline-none border-0">
            <input
              type="text"
              className="py-2 grow outline-0"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here"
            />
            <button type="submit" className="border-0">
              <MdSend className="text-xl" />
            </button>
          </label>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
