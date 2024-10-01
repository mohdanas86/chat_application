import mongoose, { mongo } from "mongoose";

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
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