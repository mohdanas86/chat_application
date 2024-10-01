import express from "express";
import protectRouter from "../middleware/protect.router.js";
import User from "../userModel/userSchema.js";

const userRouter = express.Router();

// Endpoint to get users for the sidebar
userRouter.get("/", protectRouter, getUserForSidebar);

async function getUserForSidebar(req, res) {
    try {
        const currentUserId = req.user._id; // Get the current user's ID

        // Fetch all users excluding the current user
        const allUsers = await User.find({
            _id: { $ne: currentUserId } // Exclude current user
        });

        // Check if no users were found
        if (!allUsers || allUsers.length === 0) {
            return res.status(200).json({
                message: "No conversation has been started yet."
            });
        }

        // Send the response with all users
        return res.status(200).json(allUsers);

    } catch (err) {
        console.error("Error fetching users:", err); // Log the error with context
        return res.status(500).json({
            message: "Failed to fetch users for sidebar.",
            error: err.message || "An error occurred"
        });
    }
}

export default userRouter;
