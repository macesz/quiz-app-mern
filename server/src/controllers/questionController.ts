import { Request, Response } from 'express';
import Question from "../models/Question.js";
import { IQuestionDocument } from '../interfaces/IQuestion.js';
import { IQuestionQuery } from './interfaces/IQuestionQuery.js';


export const getQuestions = async (
    req: Request<{}, {}, {}, IQuestionQuery>,
    res: Response

) => {
    try {
    const { difficulty, category_id, limit } = req.query;

    const limitNumber = limit ? parseInt(limit) : 10;

    const queryFilter: any = {};

    if (difficulty) {
        queryFilter.difficulty = difficulty;
    }
    if (category_id) {
        queryFilter.category_id = parseInt(category_id);
    }

        const filtered: IQuestionDocument[] = await Question.find(queryFilter).limit(limitNumber);

        return res.json(filtered);
    } catch (err) {
        console.error('Error fetching questions:', err);
        return res.status(500).json({ message: 'Server error' });
    }
};
