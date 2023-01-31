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
    body('title', 'Put the title please').isLength({ min: 3 }).isString(),
    body('text', 'Put the post text please').isLength({ min: 10 }).isString(),
    body('tags', 'Invalid tags format, please use an array').optional().isArray(),
    body('imgUrl', 'Invalid image link').optional().isString()
];

export const commentCreateValidation = [
    body('postId', 'Put the post id please').isString(),
    body('text', 'Put the correct length of the comment text').isLength({ min: 3 }).isString(),
    body('user', 'Put the correct format of user data').isObject()
];
