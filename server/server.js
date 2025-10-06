import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import 'dotenv/config'
import usersRoutes from "./Routes/usersRoutes.js"
import gamesRoutes from "./Routes/gamesRoutes.js";
import questionsRoutes from "./Routes/questionsRoutes.js";
import populateDatabase from "./populate.js"
import Question from './models/Question.js';


await mongoose.connect(process.env.MONGO_URI);

const count = await Question.estimatedDocumentCount();
if (count === 0) {
  console.log("no questions yet, populating…");
  await populateDatabase();
}

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/questions", questionsRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));