import express from "express"
import productRoute from "../middleware/auth.middleware.js";
import { getMessages, getUserForSidebar } from "../controller/message.controller.js";

const route = express.Router()

route.get("/users",productRoute,getUserForSidebar)
route.get("/:id",productRoute,getMessages)





export default route;