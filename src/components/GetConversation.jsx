// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const GetConversation = () => {
//   const [coversations, setConversations] = useState("");

//   const fetchConversation = async () => {
//     try {
//       const url = "http://localhost:4000/api/users";
//       const response = await axios.get(url);
//       console.log(response);
//     } catch (err) {
//       console.log(err);
//       toast.error(err);
//     }
//   };

//   useEffect(()=>{
//     fetchConversation()
//   }, [])
//   return <>GetConversation</>;
// };

// export default GetConversation;
