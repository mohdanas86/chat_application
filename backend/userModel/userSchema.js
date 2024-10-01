import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,  // Use 'type' instead of 'Types'
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female"],  // Ensure enum values are valid
        required: false  // Add this if gender is not always required
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilepic: {
        type: String,
        default: ""
    }
}, {timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;
