// import jwt from 'jsonwebtoken';
// import User from '../userModel/userSchema.js';

// const protectRouter = async (req, res, next) => {
//     try {
//        const token = req.cookies.JWT; // Corrected token extraction
//     //    console.log("token", token)

//         if (!token) {
//             return res.status(401).json({
//                 message: 'Token not provided'
//             });
//         }

//         const decode = jwt.verify(token, process.env.SECRET_KEY);

//         if (!decode) {
//             return res.status(401).json({
//                 message: 'Invalid token'
//             });
//         }

//         const user = await User.findById(decode.userId).select('-password'); // Corrected password selection

//         if (!user) {
//             return res.status(401).json({
//                 message: 'User not found'
//             });
//         }

//         req.user = user;
//         next();

//     } catch (err) {
//         console.error(err); // Log the error for debugging
//         return res.status(500).json({
//             message: 'Internal server error'
//         });
//     }
// }

// export default protectRouter;


import jwt from 'jsonwebtoken';
import User from '../userModel/userSchema.js';

const protectRouter = async (req, res, next) => {
    try {
        // Extract the token from cookies
        const token = req.cookies.JWT;

        // Log the token for debugging (optional)
        console.log("Token:", token);

        if (!token) {
            return res.status(401).json({
                message: 'Token not provided'
            });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Check if decoding was successful and contains userId
        if (!decoded || !decoded.userId) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        // Find the user by ID and exclude the password field
        const user = await User.findById(decoded.userId).select('-password');

        // Check if the user exists
        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        // Attach the user to the request object
        req.user = user;
        next(); // Proceed to the next middleware or route handler

    } catch (err) {
        console.error("Authentication error:", err); // Log the error for debugging
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
};

export default protectRouter;



// // Fetch all user conversations
// const fetchConversation = async () => {
//     try {
//       const url = "http://localhost:4000/api/users";
//       const response = await axios.get(url, { withCredentials: true });
//       setUserConversation(response.data);
//     } catch (err) {
//       console.error("Error fetching conversations:", err);
//     }
//   };

//   // Remove a cookie by name
//   const deleteCookie = (name) => {
//     document.cookie = `${name}=; Max-Age=0; path=/;`;
//   };

//   // Set JWT token in cookies
//   const setTokenCookies = () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       document.cookie = `JWT=${token}; path=/; max-age=3600`;
//     } else {
//       deleteCookie("JWT");
//     }
//   };

//   // Logout function
//   const logout = () => {
//     setAuthUser(null);
//     localStorage.removeItem("chat-user");
//     localStorage.removeItem("token");
//     deleteCookie("JWT");
//   };

//   // Fetch current user messages
//   const fetchMessages = async () => {
//     if (!currentId) return;

//     try {
//       const url = `http://localhost:4000/api/message/${currentId}`;
//       const response = await axios.get(url, { withCredentials: true });
//       setCurrentUserMessages(response.data.conversation);
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   useEffect(() => {
//     if (authUser) {
//       localStorage.setItem("chat-user", JSON.stringify(authUser)); // Update chat-user in localStorage
//       setTokenCookies(); // Set token in cookies
//     } else {
//       localStorage.removeItem("chat-user");
//       localStorage.removeItem("token");
//       deleteCookie("JWT"); // Remove JWT if user is logged out
//     }

//     fetchConversation(); // Fetch conversations when authUser changes
//     fetchMessages(); // Fetch messages based on currentId
//   }, [authUser, currentId]);