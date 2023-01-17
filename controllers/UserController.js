import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';

export const reqister = async (req, res) => {

    try {

        const password = req.body.passwordHash;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash
        });

        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            });

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The registration is fallen'
        });
    }

}

export const login = async (req, res) => {

    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Thete is no exact user'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.passwordHash, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(400).json({
                message: 'Invalid login or password'
            });
        }

        const token = jwt.sign(
            {
                _id: user._id
            },
            'secret123',
            {
                expiresIn: '30d'
            });

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            message: 'The login is fallen'
        });

    }
};

export const getMe = async (req, res) => {

    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            res.status(404).json({
                message: 'Can not find exact user'
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData)
    } catch (error) {
        res.status(400).json({
            message: 'Invalid request'
        })
    }
}