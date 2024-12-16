import express from "express"
import productRoute from "../middleware/auth.middleware.js";
import { getMessages, getUserForSidebar,sendMessage} from "../controller/message.controller.js";

const route = express.Router()

route.get("/users",productRoute,getUserForSidebar)
route.get("/:id",productRoute,getMessages)
route.post("/send/:id", productRoute, sendMessage);





export default route; 