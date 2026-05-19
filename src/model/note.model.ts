import mongoose from 'mongoose'

interface Inote {
  note:String
}
const NoteSchema = new mongoose.Schema<Inote>({
  note:{
    type:String
  }
},{timestamps:true})

export const Note = mongoose.models.Note || mongoose.model('Note',NoteSchema)
