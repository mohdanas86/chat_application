import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const useAuthcontext = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [search, setSearch] = useState(false);
  const [togalMenu, setTogalMenu] = useState(false);
  const [conversation, setConversation] = useState(false);
  const [userConversation, setUserConversation] = useState("");
  const [currentUserMessages, setCurrentUserMessages] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [selectedConversation, setSelectedConversation] = useState("null");
  const [noMessage, setNoMessage] = useState("");
  const [mobileChat, setMobileChat] = useState(false);

  // Initialized authUser from localStorage or default to null
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  // Fetch user conversations
  const fetchConversation = async () => {
    try {
      if (localStorage.getItem("chat-user")) {
        const url = "https://chatstom.onrender.com/api/users";
        const response = await axios.get(url, { withCredentials: true });
        console.log("User Conversations:", response.data);
        setUserConversation(response.data);
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
    }
  };

  // Remove a cookie by name
  const deleteCookie = (name) => {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  };

  // Set JWT token in cookies
  const setTokenCookies = () => {
    const token = localStorage.getItem("token");
    if (token) {
      document.cookie = `JWT=${token}; path=/; max-age=3600`;
    } else {
      deleteCookie("JWT");
    }
  };

  // Logout function
  const logout = () => {
    setAuthUser(null); // Set authUser to null to signify logout
    localStorage.removeItem("chat-user"); // Remove user data from localStorage
    localStorage.removeItem("token"); // Remove token from localStorage
    deleteCookie("JWT"); // Delete the JWT cookie
  };

  // Fetch current user messages
  const fetchMessages = async () => {
    try {
      if (currentId) {
        const url = `https://chatstom.onrender.com/api/message/${currentId}`;
        const response = await axios.get(url, { withCredentials: true });
        if (response) {
          setNoMessage("");
        }
        console.log("All messages:", response.data.conversation);
        setCurrentUserMessages(response.data.conversation);
      }
    } catch (err) {
      //   console.error("Error fetching messages:", err.response.data.message);
      // toast.error(err.response.data.message);
      toast(err.response.data.message, {
        duration: 2000,
      });
      setNoMessage(err.response.data.message);
      setCurrentUserMessages([]);
    }
  };

  // Handle token and fetch conversation on mount or when authUser changes
  useEffect(() => {
    if (authUser) {
      setTokenCookies(); // Set the token cookie if authUser is available
    }
    fetchConversation(); // Fetch conversations on component mount
  }, [authUser]);

  // Fetch messages whenever the currentId changes
  useEffect(() => {
    fetchMessages(); // Fetch user messages when currentId changes
  }, [currentId]);

  // Handle authUser changes to update localStorage
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
      localStorage.removeItem("token");
      deleteCookie("JWT");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        setAuthUser,
        logout,
        togalMenu,
        setTogalMenu,
        conversation,
        setConversation,
        search,
        setSearch,
        userConversation,
        setUserConversation,
        selectedConversation,
        setSelectedConversation,
        currentUserMessages,
        setCurrentUserMessages,
        fetchMessages,
        currentId,
        setCurrentId,
        fetchConversation,
        noMessage,
        setNoMessage,
        mobileChat,
        setMobileChat,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
