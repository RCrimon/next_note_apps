import mongoose  from "mongoose";

interface Iuser {
  name: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}

const UserSchema = new mongoose.Schema<Iuser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
},{timestamps: true})

export const User = mongoose.models.User || mongoose.model('User', UserSchema)