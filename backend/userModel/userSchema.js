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

// Add a method to the User schema to generate a JWT
// userSchema.methods.generateToken = function() {
//     const secretKey = process.env.SECRET_KEY; // Use environment variable in production
//     return jwt.sign({ id: this._id }, secretKey, { expiresIn: '30d' });
// };

const User = mongoose.model("User", userSchema);
export default User;
