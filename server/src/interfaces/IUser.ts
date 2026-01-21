export interface IUser {
    username: string;
    email: string;
    password: string;
    // We omit 'Document' methods here to keep the interface "clean"
    // so it can be used in the frontend or other services easily.
}

// If you need the Mongoose-specific version for your models
import { Document, Types } from "mongoose";

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
    // We use Types.ObjectId to satisfy Mongoose, 
    // but Mongoose documents also allow ._id.toString()
    _id: Types.ObjectId; 
}