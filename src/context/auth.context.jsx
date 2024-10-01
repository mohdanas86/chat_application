import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
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
  const [selectedConversation, setSelectedConversation] = useState(null);
  // Initialized authUser from localStorage or default to null
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  // selected
  let isSelected;

  const fetchConversation = async (req, res) => {
    try {
      const url = "http://localhost:4000/api/users";
      if (localStorage.getItem("chat-user")) {
        const response = await axios(url, {
          method: "GET",
          withCredentials: true, // Important to include cookies
        });
        console.log(response.data);
        setUserConversation(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // remove cookies
  function deleteCookie(name) {
    document.cookie = `${name}=; Max-Age=0; path=/;`;
  }

  // set cookies
  const setTokenCookies = () => {
    const token = localStorage.getItem("token");
    document.cookie = `JWT=${token}; path=/; max-age=3600`;
  };

  // logout
  const logout = () => {
    setAuthUser(null); // authUser to null or an appropriate value to signify logout
    localStorage.removeItem("chat-user"); // Remove the user data from localStorage
    localStorage.removeItem("token"); // Remove the user data from localStorage
    deleteCookie("JWT");
  };

  // fetch current user message
  const fetchMessages = async () => {
    try {
      // const url = `http://localhost:4000/api/message/66e9260d2fff780b9d541d96`;
      // const url = `http://localhost:4000/api/message/${selectedConversation._id}`;
      const url = `http://localhost:4000/api/message/${currentId}`;
      console.log(url);
      if(currentId){
        const response = await axios.get(url, { withCredentials: true });
      console.log("all messages", response.data.conversation);
      setCurrentUserMessages(response.data.conversation);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {

      fetchMessages();

    
    fetchConversation();
    setTokenCookies();
    // Update localStorage whenever authUser changes
    if (authUser) {
      localStorage.setItem("chat-user", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("chat-user");
      localStorage.removeItem("userdata");
      deleteCookie("JWT");
    }
  }, [authUser,currentId, selectedConversation]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
