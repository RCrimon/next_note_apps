import connectDb from "@/src/lib/bd";
import { Note } from "@/src/model/note.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest, {params} : {params: Promise<{id:string}>}){
 await connectDb()
 try {
  const {id} = await params
 const note = await Note.findById(id)
 console.log(note)
 return NextResponse.json(note)
 } catch (error) {
 return NextResponse.json(error)
 }
}