import jwt from 'jsonwebtoken';
import User from '../userModel/userSchema.js';

const protectRouter = async (req, res, next) => {
    try {
       const token = req.cookies.JWT; // Corrected token extraction
    //    console.log("token", token)

        if (!token) {
            return res.status(401).json({
                message: 'Token not provided'
            });
        }

        const decode = jwt.verify(token, process.env.SECRET_KEY);

        if (!decode) {
            return res.status(401).json({
                message: 'Invalid token'
            });
        }

        const user = await User.findById(decode.userId).select('-password'); // Corrected password selection

        if (!user) {
            return res.status(401).json({
                message: 'User not found'
            });
        }

        req.user = user;
        next();

    } catch (err) {
        console.error(err); // Log the error for debugging
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}

export default protectRouter;
