export interface IGame extends Document {
    user_id: string;
    correct: number;
    question_number: number;
    rate: number;
}
