import connectDb from "@/src/lib/bd";
import { Note } from "@/src/model/note.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest,{params} :{params:Promise<{id:string}>}){
 await connectDb()
 try {
  const {id} = await params
  const data = await req.json()
  const updateNote = await Note.findByIdAndUpdate(
    id,
    {$set:data},
    {new:true}
  )
  if(!updateNote){
    return NextResponse.json({message:'user note not update'},{status:400})
  }
  return NextResponse.json({message:'user note update succesfully'},{status:200})
 } catch (error: any) {
    console.error("Registration Error:", error);
    
    return NextResponse.json(
      { message: error.message || "Something went wrong" }, 
      { status: 500 }
    );
  }
}