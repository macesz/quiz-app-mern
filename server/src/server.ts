import express, { Application } from "express";
import mongoose from "mongoose";
import cors from 'cors'
import 'dotenv/config'
import usersRoutes from "./Routes/usersRoutes.js"
import gamesRoutes from "./Routes/gamesRoutes.js"
import questionsRoutes from "./Routes/questionsRoutes.js"
import populateDatabase from "./populate.js";
import Question from './models/Question.js';

const app: Application = express();

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}

mongoose.connect(mongoUri)
  .then(async () => {
    console.log("Connected to MongoDB");

    const count = await Question.estimatedDocumentCount();
    if (count === 0) {
      console.log("no questions yet, populating…");
      await populateDatabase();
    }
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/games", gamesRoutes);
app.use("/api/questions", questionsRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});