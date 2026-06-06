import mongoose from 'mongoose'

interface Inote {
  note: String
  userId: String
}

const NoteSchema = new mongoose.Schema<Inote>({
  note: {
    type: String
  },
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true })

export const Note = mongoose.models.AllNote || mongoose.model('AllNote', NoteSchema);