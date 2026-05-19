import connectDb from "@/src/lib/bd";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import {authOption} from "@/src/lib/auth"
import { User } from "@/src/model/user.model";


export async function GET(req:NextRequest){
  try {
    await connectDb()
    const session = await getServerSession(authOption)
    if(!session || !session.user.email || !session.user.id){
      return NextResponse.json({message:'user does not have session'})
    }
    const user = await User.findById(session.user.id).select('-password')
    if(!user){
      return NextResponse.json({message:'user not found'})
    }
    return NextResponse.json(user)
  } catch (error) {
     return NextResponse.json(
      {message:`error${error}`},
      {status:400}
    )
  }
}