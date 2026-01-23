import express from 'express';
import { Response } from 'express';
import { signUpUser, updateUser, deleteUser, signInUser, getUserStats } from "../controllers/userController.js";
import { AuthRequest, verifyToken } from "../middleware/authMiddleware.js";
import { validateUserInput } from '../middleware/validationMiddleware.js';

const usersRoutes = express.Router();

//Public routes
usersRoutes.post("/signup", validateUserInput, signUpUser);
usersRoutes.post("/signin", signInUser)

//Protected routes
usersRoutes.get('/me', verifyToken, (req: AuthRequest, res: Response) => {
    res.json({
        user: {
            id:       req.user!._id.toString(),
            username: req.user!.username,
            email:    req.user!.email
        }
    });
});

usersRoutes.get('/stats', verifyToken, getUserStats);

usersRoutes.route('/')
    .patch(verifyToken, validateUserInput, updateUser)
    .delete(verifyToken, deleteUser);

export default usersRoutes;