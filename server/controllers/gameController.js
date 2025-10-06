import Game from '../models/Games.js';

export const postGameResult = async (req, res) => {
    const { user_id, correct, question_number, rate } = req.body;
    const game = new Game({
        user_id,
        correct,
        question_number,
        rate
    })
    game.save()
        .then(game => res.json(game))
        .catch(err => res.status(400).json({ success: false }))
}