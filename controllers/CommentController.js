import CommentModel from "../models/Comment.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await CommentModel.find().populate('user').exec();
        res.json(comments);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can not get all comments'
        })
    }
};

export const create = async (req, res) => {
    try {
        console.log(req.body);
        const doc = new CommentModel({
            postId: req.body.postId,
            text: req.body.text,
            user: req.body.user
        });

        const post = await doc.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can not create the post'
        })
    }
};