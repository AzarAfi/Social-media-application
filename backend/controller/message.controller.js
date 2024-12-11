import Message from "../model/message.model.js";
import User from "../model/user.model.js";
import cloudinary from "cloudinary"


export const getUserForSidebar = async (req,res) =>{
  try {
    const logInUserId = req.user._id;
   const filterUserId = await User.find({_id:{$ne:logInUserId}}).select("-password")
   res.status(200).json(filterUserId);
  } catch (error) {
    console.log("Error in getUserForSidebar", error.message);
		res.status(500).json({ error: "Internal Server Error" });
  }
   

}
export const getMessages = async (req,res) =>{
    try {
        const {id:userToChatId}= req.params;
        const myId = req.user._id;
        const message = await Message.find({
            $or:[ {senderId:myId,reciverId:userToChatId},
                {senderId:userToChatId,reciverId:myId}]
        })
           res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessages", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}

export const sendMessage = async (req,res) =>{
try {
  const {text,img} = req.body;
  const {id:reciverId} = req.params; // reciverId
  const senderId = req.user._id;    //current login user id
let imageUrl;

   if(img){
     const uploadResponce = await cloudinary.uploader.upload(img);
     imageUrl = uploadResponce.secure_url;
  }
  const newMessage = new Message({
    senderId,
    reciverId,
    text,
    img:imageUrl
  });
  await newMessage.save()
  res.status(201).json(newMessage)
} catch (error) {
  console.log("Error in sendMessage", error.message);
  res.status(500).json({ error: "Internal Server Error" });
}
 

}