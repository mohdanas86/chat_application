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