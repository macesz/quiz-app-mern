import { Document } from "mongoose";


export interface IAnswer extends Document {
    game_id: string;
    question_id: string;
    correct: boolean;
}

export interface IAnswerDocument extends IAnswer, Document {}