
import { Schema, model, Document } from "mongoose";
import { IQuestionDocument } from "../interfaces/IQuestion.js";


const questionSchema = new Schema<IQuestionDocument>({
    category_id: Number,
    category_name: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
})

export default model<IQuestionDocument>('Question', questionSchema);