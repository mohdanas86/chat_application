import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdSend } from "react-icons/md";
import { useAuthcontext } from "../../context/auth.context";

const MessageInput = () => {
  const { currentId, fetchMessages } = useAuthcontext();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Message cannot be empty.");
      return;
    }

    if (!currentId) {
      setError("No conversation selected.");
      return;
    }

    try {
      const url = `https://chatstom.onrender.com/api/message/send/${currentId}`;
      await axios.post(url, { message }, { withCredentials: true });

      setMessage(""); // Clear the message input
      fetchMessages(); // Fetch messages after sending
      setSuccess(true); // Indicate message sent successfully
      setError(""); // Clear any previous error
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
      setSuccess(false);
    }
  };

  useEffect(() => {
    // Reset success message after 2 seconds
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="messageInputCon w-full bg-white absolute bottom-2 left-0">
      <div className="messageInputBox flex justify-center items-center flex-col gap-4 text-black rounded-xl py-2 w-[95%] mx-auto">
        {/* MESSAGE INPUT */}
        <form className="searchBar w-full" onSubmit={handleSubmit}>
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
