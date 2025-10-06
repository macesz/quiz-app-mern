import { body, validationResult } from 'express-validator'

export const validateUserInput = [
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min:6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => ({ message: error.msg}));
            return res.status(400).json({ errors: errorMessages});
        }
        next();
    }
];
