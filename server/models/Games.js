import mongoose from "mongoose";
const { Schema, model } = mongoose;

const gamesSchema = new Schema({
    user_id: String,
    correct: Number,
    question_number: Number,
    rate: Number
})

const Games = model('Game', gamesSchema)

export default Games