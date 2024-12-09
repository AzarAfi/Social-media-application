import mongoose from "mongoose"
const connectDB = async ()=>{
    try{
     await mongoose.connect(process.env.MONGO_URL)
     console.log("mongo db connected")
    }
    catch(error){
        console.log(`error in connetin DB:${error}`)
        process.exit(1) /* it will stop the DB */
    }
}

export default connectDB;