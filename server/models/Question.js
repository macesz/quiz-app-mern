
import mongoose from "mongoose";
const { Schema, model } = mongoose;

const questionSchema = new Schema({
    category_id: Number,
    category_name: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String],
})

const Question = model('Question', questionSchema)

export default Question