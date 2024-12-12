import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import authRoute from "./router/auth.route.js"
import cookieParser from "cookie-parser"
import  messageRoute   from "./router/message.route.js"
import cors from "cors"

const app = express()
dotenv.config()
app.use(express.json({ limit: "5mb" })); // it will take from data from body
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const PORT = process.env.PORT||1411

app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

app.listen(PORT,()=>{
    console.log(`server has running${PORT}`)
    connectDB();
})