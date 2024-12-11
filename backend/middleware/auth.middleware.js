import jwt from "jsonwebtoken";
import User from "../model/user.model.js";

const productRoute = async (req, res, next) => {
    try {
        // Check if the token exists
        const token = req.cookies?.jwt;
        if (!token) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        // Find the user in the database
        const user = await User.findOne({ _id: decoded.userId }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Attach user to request and proceed
        req.user = user;
        next();

    } catch (error) {
        console.error(`Error in product route middleware: ${error.message}`);
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
};

export default productRoute;
