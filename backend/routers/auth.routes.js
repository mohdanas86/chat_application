import express from "express";
import bcrypt from "bcrypt"
import User from "../userModel/userSchema.js";
import jwt from "jsonwebtoken"
import genrateJwtToken from "../utils/genrateToken.js";

const Route = express.Router();

Route.post("/signup", signUp);  // get for signup
Route.post("/login", login);    // get for login
Route.post("/logout", logout);  // POST for logout


// SIGN-UP FUNCTION
async function signUp(req, res) {
    try {

        const { fullname, username, gender, password } = req.body;

        const existUser = await User.findOne({ username });

        if (existUser) {
            return res.status(400).json({
                message: "user already registered"
            })
        }

        const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password, salt)

        const newUser = new User({
            fullname,
            username,
            gender,
            password: hashPass,
            profilepic: gender === "male" ? boyPic : girlPic
        })

        const token = genrateJwtToken(newUser._id, res) // genrate token

        await newUser.save();

        return res.status(200).json({
            message: "new User Added",
            userdata: newUser,
            token : token
        })

    } catch (err) {
        return res.status(401).json({
            messgae: err.message
        })
    }
}

// LOGIN FUNCTION
async function login(req, res) {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });
        // Check if user exists
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid username or password"
            });
        }

        // Generate JWT token
        const token = genrateJwtToken(user._id, res)
       // console.log(token)
        return res.status(200).json({
            message: "Login successful",
            user: user,
            token: token
        });

    } catch (err) {
        return res.status(500).json({
            message: "Login failed, please try again",
            error: err.message
        });
    }
}


// LOGOUT FUNCTION
async function logout(req, res) {
    try {
        res.cookie("JWT", "", { maxAge: 0 });
        return res.status(200).json({
            message: "logout successfully"
        })
    } catch (err) {
        return res.status(401).json({
            message: err.message
        })
    }
}

export default Route;
