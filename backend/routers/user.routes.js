// import express from "express"
// import protectRouter from "../middleware/protect.router.js";
// import User from "../userModel/userSchema.js";
// const userRouter = express.Router();

// userRouter.get("/" , protectRouter, getUserForSidebar)

// async function getUserForSidebar(req, res) {
//     try {
// const getUserId = req.user._id;

// const alluser = await User.find({
//     _id : {
//         $ne : getUserId
//     }
// })
// // console.log(alluser)
// res.status(200).json(alluser)

//     } catch (err) {
//         return res.status(401).json({
//             message: "sidebar user error",
//             error: err
//         })
//     }
// }

// export default userRouter

import express from "express";
import protectRouter from "../middleware/protect.router.js";
import User from "../userModel/userSchema.js";

const userRouter = express.Router();

// Endpoint to get users for sidebar
userRouter.get("/", protectRouter, getUserForSidebar);

async function getUserForSidebar(req, res) {
    try {
        const currentUserId = req.user._id; // Get the current user's ID

        // Fetch all users excluding the current user
        const allUsers = await User.find({
            _id: { $ne: currentUserId } // Exclude current user
        });

        // Send the response with all users
        if(!allUsers){
            res.status(200).json({
                message: "no conversation start now"
            });
        }

        if(allUsers){
            res.status(200).json(allUsers);
        }
    } catch (err) {
        console.error("Error fetching users:", err); // Log the error with context
        return res.status(500).json({
            message: "Failed to fetch users for sidebar.",
            error: err.message || "An error occurred"
        });
    }
}

export default userRouter;
