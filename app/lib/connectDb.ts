import mongoose from "mongoose";


const connectDb = async ()=>{
  const Url = process.env.MONGODB_URL
  try {
   if(){
    
   }
   console.log('conneted')
  } catch (error) {
    console.log(error)
  }
}

export default connectDb