
import { User } from "@/src/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

export async function POST( req: NextRequest){
  try {
    const {name,email,password} = await req.json()
    const exEmail = await User.findOne({email})
    if(exEmail){
      return NextResponse.json('user allready existd')
    }
    const hashPassword = await bcrypt.hash(password,10)
    const newUser = new User({
      name,
      email,
      password:hashPassword
    })
    await newUser.save()
   return NextResponse.json({message:'user register succesfully'})
  } catch (error: any) {
    console.error("Registration Error:", error);
    
    return NextResponse.json(
      { message: error.message || "Something went wrong" }, 
      { status: 500 }
    );
  }
  
}