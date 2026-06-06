import connectDb from "@/src/lib/bd";
import { Note } from "@/src/model/note.model";
import {getServerSession} from 'next-auth'
import { authOption } from "@/src/lib/auth"
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest){
 await connectDb()
 const session = await getServerSession(authOption)
 if (!session || !session.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
 try {
  const loggedInUserId = session.user.id;
  const userNotes = await Note.find({ userId: loggedInUserId }).sort({ createdAt: -1 });
  return NextResponse.json(userNotes, { status: 200 });
 } catch (error) {
  return NextResponse.json(error)
 }
}