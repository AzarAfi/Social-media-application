import Message from "../model/message.model.js";
import User from "../model/user.model.js";


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
                {senderId:userToChatId,reciverId:myId}
                ]
        })
           res.status(200).json(message)
    } catch (error) {
        console.log("Error in getMessages", error.message);
		res.status(500).json({ error: "Internal Server Error" });
    }
}