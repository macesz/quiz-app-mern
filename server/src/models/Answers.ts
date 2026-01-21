import { Schema, model, Document } from "mongoose";
import { IAnswerDocument } from "../interfaces/IAnswer.js";

const answersSchema = new Schema<IAnswerDocument>({
    game_id: String,
    question_id: String,
    correct: Boolean,
})

export default model<IAnswerDocument>('Answer', answersSchema);