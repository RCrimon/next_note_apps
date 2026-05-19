import { connect } from "mongoose";
const url = process.env.MONGODB_URL

if(!url){
  throw new Error('url not found')
}
let cached = global.mongoose
if(!cached){
  cached = global.mongoose = {
    conn:null,
    promise:null
  }
}

const connectDb = async ()=>{
     if(cached.conn){
      return cached.conn
    }
    if(!cached.promise){
         cached.promise = connect(url as string).then((e)=>e.connection)
      }
  try {
    cached.conn = await cached.promise
  } catch (error) {
    console.log(error)
    throw Error('erroor')
  }
  return cached.conn
}
export default connectDb