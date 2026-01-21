import express from 'express'
import { getQuestions } from '../controllers/questionController.js';

const questionsRoutes = express.Router();

questionsRoutes.get("/", getQuestions);

export default questionsRoutes;