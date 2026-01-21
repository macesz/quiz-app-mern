import { Schema, model, Document } from "mongoose";
import { IUserDocument } from "../interfaces/IUser.js";



const userSchema = new Schema<IUserDocument>({
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  });


export default model<IUserDocument>('User', userSchema);