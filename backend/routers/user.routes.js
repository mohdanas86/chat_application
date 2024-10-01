import express from "express"
import protectRouter from "../middleware/protect.router.js";
import User from "../userModel/userSchema.js";
const userRouter = express.Router();

userRouter.get("/" , protectRouter, getUserForSidebar)

async function getUserForSidebar(req, res) {
    try {
const getUserId = req.user._id;

const alluser = await User.find({
    _id : {
        $ne : getUserId
    }
})
// console.log(alluser)
res.status(200).json(alluser)

    } catch (err) {
        return res.status(401).json({
            message: "sidebar user error",
            error: err
        })
    }
}

export default userRouter