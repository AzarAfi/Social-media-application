import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const productRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(400).json({ error: "unauthorized: no token provided" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(400).json({ error: "unauthorized: invalid token" });
        }

        // Await the user lookup to ensure you get the actual user document
        const user = await User.findOne({ _id: decoded.userId }).select("-password");

        if (!user) {
            return res.status(400).json({ error: "user not found" });
        }

        // Attach the user to the request object
        req.user = user;
        next();

    } catch (error) {
        console.log(`Error in product route middleware: ${error}`);
        res.status(500).json({ error: "internal server error" });
    }
};

export default productRoute;
