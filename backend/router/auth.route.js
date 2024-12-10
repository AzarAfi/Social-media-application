import express from "express"
import {signup,login,logout,updateProfile,checkUser} from "../controller/auth.controller.js"
import productRoute from "../middleware/auth.middleware.js"

const router = express.Router()

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile",productRoute,updateProfile)

router.get("/checkuser",productRoute,checkUser)



export default router;