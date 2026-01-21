export interface IQuestion extends Document {
    category_id: number;
    category_name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
