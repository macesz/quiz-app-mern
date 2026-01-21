import { Schema, model, Document } from "mongoose";
import { IGameDocument } from "../interfaces/IGame.js";


const gamesSchema = new Schema<IGameDocument>({
    user_id: String,
    correct: Number,
    question_number: Number,
    rate: Number
})

export default model<IGameDocument>('Game', gamesSchema);