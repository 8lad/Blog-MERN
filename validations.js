import { body } from "express-validator";

export const registerValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('passwordHash', 'Password must be more than 5 symbols lenght').isLength({ min: 5 }),
    body('fullName', 'Set your name').isLength({ min: 3 }),
    body('avatarUrl', 'Incorrect image URL').optional().isURL()
];

export const loginValidation = [
    body('email', 'Incorrect email format').isEmail(),
    body('passwordHash', 'Password must be more than 5 symbols lenght').isLength({ min: 5 }),
];

export const postCreateValidation = [
    body('title', 'Puth the title please').isLength({ min: 3 }).isString(),
    body('text', 'Put the post text please').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tags format, please use an array').optional().isString(),
    body('imgUrl', 'Invalid image link').optional().isString()
];