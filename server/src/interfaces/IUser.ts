export interface IUser {
    username: string;
    email: string;
    password: string;
    // We omit 'Document' methods here to keep the interface "clean"
    // so it can be used in the frontend or other services easily.
}

// If you need the Mongoose-specific version for your models
import { Document } from "mongoose";
export interface IUserDocument extends IUser, Document {
    _id: string; // Explicitly defining _id helps with type safety later
}