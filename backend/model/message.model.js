import mongoose from "mongoose"
const messageSchema = new mongoose.Schema({
    senderId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
        
    },
    reciverId:{

        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true,
        
    },
  text:{
        type:String,
    },
    img:{
        type:String,
    }
},{timestamps: true })

const Message =mongoose.model("Message",messageSchema)
export default Message;