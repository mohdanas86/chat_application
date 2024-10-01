// // Import the jsonwebtoken library
import JWT from "jsonwebtoken";

// // Function to generate and set a JWT token as an HTTP-only cookie
// const genrateJwtToken = (userId, res) => {
//     // Create a JWT token using the userId and a secret key from environment variables
//     const token = JWT.sign({ userId }, process.env.SECRET_KEY, {
//         expiresIn: "15d" // Token expires in 1 day
//     });

//     // Set the token as an HTTP-only cookie
//     res.cookie("JWT", token, {
//         maxAge: 15 * 24 * 60 * 60 * 1000, // Cookie expires in 15 days
//         httpOnly: true, // Cookie is not accessible via JavaScript (helps prevent XSS attacks)
//         sameSite: "strict" // Cookie is sent only for same-site requests (helps prevent CSRF attacks)
//     });
// }


const genrateJwtToken = (userId, res) => {
    const token = JWT.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: "15d"
    });

    // Set the token as an HTTP-only cookie
    res.cookie("JWT", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict"
    });

    return token; // Return the token
}

export default genrateJwtToken