import express from 'express';
import { signUpUser, updateUser, deleteUser, signInUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { validateUserInput } from '../middleware/validationMiddleware.js';

const usersRoutes = express.Router();

usersRoutes.route('/')
    .patch(verifyToken, validateUserInput, updateUser)
    .delete(verifyToken, deleteUser);

usersRoutes.post("/signup", validateUserInput, signUpUser);
usersRoutes.post("/signin", signInUser);

export default usersRoutes;