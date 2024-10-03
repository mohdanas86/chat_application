import JWT from "jsonwebtoken";

const genrateJwtToken = (userId, res) => {
    const token = JWT.sign({ userId }, "anasChatApplicationSecretKey", {
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