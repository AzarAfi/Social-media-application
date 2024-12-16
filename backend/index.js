import express from "express"
import dotenv from "dotenv"
import connectDB from "./lib/db.js"
import authRoute from "./router/auth.route.js"
import cookieParser from "cookie-parser"
import  messageRoute   from "./router/message.route.js"
import cors from "cors" 
import {app, server} from "./lib/socket.js"
import path from "path"


dotenv.config()
app.use(express.json({ limit: "5mb" })); // it will take from data from body
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

const PORT = process.env.PORT||1411
const __dirname = path.resolve();
 
app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);
if(process.env.NODE_ENV=="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")))
    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontenddist", "dist","index.html"))
    })
}

server.listen(PORT,()=>{
    console.log(`server has running${PORT}`)
    connectDB();
})