import http from "http";
import dotenv from "dotenv";
import express from "express";
import cors from "cors"
import bodyParser from "body-parser"
import cookieParser from 'cookie-parser';
import dbConnection from "./DB/db_connection.js"
import Route from "./routers/auth.routes.js";
import userRouter from "./routers/user.routes.js";
import messageRouter from "./routers/message.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const web = {
    origin: process.env.FORNTEND_ORIGIN,
    credentials: true
}
app.use(cors(web))


// Middleware to parse JSON bodies
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))

// Define a basic route
app.get("/", (req, res) => {
    res.send("hello");
});

// Use routes from auth.routes
app.use("/api/auth", Route);
app.use("/api/message", messageRouter);
app.use("/api/users", userRouter);

// Create and start the server
const server = http.createServer(app);
server.listen(PORT, () => {
    dbConnection();
    console.log(`Server running on port ${PORT}`);
});
