import connectDb from "@/src/lib/bd";
import { Note } from "@/src/model/note.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
 await connectDb()
 try {
  const data = await Note.find({}).sort({createdAt:-1})
  return NextResponse.json(data)
 } catch (error) {
  return NextResponse.json(error)
 }
}