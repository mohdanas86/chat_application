import mongoose, { mongo } from "mongoose";

const url = "mongodb+srv://anas:anas@food.t6wubmw.mongodb.net/chat?retryWrites=true&w=majority&appName=food"

const dbConnection = async () => {
    try {
        await mongoose.connect(url)
        .then((db)=>{
            console.log("db connected...")
        }).catch((err)=>{
            console.log("db connection problem", err.message)
        })
    } catch (err) {
        console.log("database connection problem", err.message)
    }
}

export default dbConnection