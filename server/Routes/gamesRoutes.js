import express from 'express';
import { postGameResult } from '../controllers/gameController.js';

const gamesRoutes = express.Router();

gamesRoutes.post("/", postGameResult);

export default gamesRoutes;