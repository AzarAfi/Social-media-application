import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"




const app = express()
dotenv.config()
const PORT = process.env.PORT||5001

app.listen(PORT,()=>{
    console.log(`server has running${PORT}`)
    connectDB();
})