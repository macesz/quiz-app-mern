import Game from '../models/Games.js';
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware.js';
import { IPostGameResultBody } from './interfaces/IGameRequest.js';


export const postGameResult = async (
    req: AuthRequest & { body: IPostGameResultBody }, 
    res: Response
    ) => {

    const { user_id, correct, question_number, rate } = req.body;
    
    try {
        /**
         * Security Check: 
         * Verify that the user_id provided in the body matches the 
         * user_id extracted from the JWT token.
         */
        if (req.user && req.user._id.toString() !== user_id) {
            return res.status(403).json({ message: "Unauthorized: User ID mismatch" });
        }

        const game = new Game({
            user_id, // Using the user_id provided in the request body
            correct,
            question_number,
            rate
        });

        const savedGame = await game.save();
        res.json(savedGame);
    } catch (err) {
        console.error("Save game error:", err);
        res.status(400).json({ success: false });
    }
}