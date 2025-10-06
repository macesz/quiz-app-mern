import Question from "../models/Question.js";

export const getQuestions = async (req, res) => {
    const difficulty = req.query.difficulty
    const category_id = req.query.category_id
    const limit = req.query.limit

    const filtered = await Question.find({ category_id: category_id, difficulty: difficulty }).limit(limit)
    return res.json(filtered);
}