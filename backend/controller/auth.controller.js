
import { generateTokenAndSetCookie } from "../lib/generatetoken.js";
import User from "../model/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../middleware/auth.middleware.js"

export const signup = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Invalid email format" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ error: "Username is already taken" });
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ error: "Email is already taken" });
		}

		if (password.length < 6) {
			return res.status(400).json({ error: "Password must be at least 6 characters long" });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			fullName,
			email,
			password: hashedPassword,
		});

		if (newUser) {
			generateTokenAndSetCookie(newUser._id, res);
			await newUser.save();

			res.status(201).json({
				_id: newUser._id,
				fullName: newUser.fullName,
				email: newUser.email,
			  prfilePic:newUser.profilePic||"",
			});
		} else {
			res.status(400).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({email});
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
		

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			fullName: user.fullName,
			email: user.email,
      prfilePic:user.profilePic,
			
		});
	
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = async (req, res) => {
	try {
		res.cookie("jwt", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const updateProfile = async (req,res) =>{
	try {
    const {profilePic} = req.body;
	const userId = req.user._id;
	if (!profilePic){
		res.status(400).json({ error: "profilePic is require" });
	}
		
	const uploadResponse = await cloudinary.uploader.upload(profilePic)
	const updateUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

		res.status(200).json(updateUser);
	} catch (error) {
		console.log("Error in update Profile controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
}

export const  checkUser = (req,res) =>{
	try {
		res.status(200).json(req.user);
	} catch (error) {
		console.log("Error in check user", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
	
}