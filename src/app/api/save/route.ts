import connectDb from "@/src/lib/bd";
import { Note } from "@/src/model/note.model";
import {getServerSession} from 'next-auth'
import {authOption} from '@/src/lib/auth'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
  await connectDb()
  const session = await getServerSession(authOption)
  if(!session ||!session.user){
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const {note} =  await req.json()
    const logedUserId = session.user.id
    const result = await Note.create({
      note,
      userId: logedUserId
    })
    return NextResponse.json(result)
  } catch (error) {
    console.log(error)
     return NextResponse.json(error)
  }
}