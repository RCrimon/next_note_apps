import connectDb from "@/src/lib/bd";
import { Note } from "@/src/model/note.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  await connectDb()
  try {
    const {note} =  await req.json()
    const result = await Note.create({
      note
    })
    return NextResponse.json(result)
  } catch (error) {
    console.log(error)
     return NextResponse.json(error)
  }
}