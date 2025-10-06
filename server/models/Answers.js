import mongoose from "mongoose";
const { Schema, model } = mongoose;

const answersSchema = new Schema({
    game_id: String,
    question_id: String,
    correct: Boolean,
})

const Answers = model('Question', answersSchema)

export default Answers