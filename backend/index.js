import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import authRoute from "./router/auth.route.js"
import cookieParser from "cookie-parser"


const app = express()
dotenv.config()
app.use(express.json()) // it will take from data from body
app.use(cookieParser())

const PORT = process.env.PORT||1411

app.use("/api/auth", authRoute);

app.listen(PORT,()=>{
    console.log(`server has running${PORT}`)
    connectDB();
})