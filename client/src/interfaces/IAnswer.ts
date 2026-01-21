export interface IAnswer extends Document {
    game_id: string;
    question_id: string;
    correct: boolean;
}

