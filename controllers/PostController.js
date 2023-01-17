import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can not get all posts'
        })
    }
};

export const getOne = async (req, res) => {
    try {

        const postId = req.params.id;

        PostModel.findOneAndUpdate({
            _id: postId,
        },
            {
                $inc: { viewsCount: 1 }
            },
            {
                returnDocument: 'after'
            },
            (error, doc) => {
                if (error) {
                    console.log(error);
                    return res.status(500).json({
                        message: 'Can not update the post'
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'Can not finde exact post'
                    });
                }

                res.json(doc);
            }
        );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can not get all posts'
        })
    }
};

export const remove = async (req, res) => {
    try {

        const postId = req.params.id;

        PostModel.findOneAndDelete({
            _id: postId
        }, (error, doc) => {
            if (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Can not delete exact post'
                });
            }
            if (!doc) {
                console.log(error);
                return res.status(404).json({
                    message: 'Can not find exact post'
                });
            }

            res.json({
                success: true
            })
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can not delete exact post'
        });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tage: req.body.tags,
            user: req.userId
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

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.updateOne({
            _id: postId
        },
            {
                title: req.body.title,
                text: req.body.text,
                imageUrl: req.body.imageUrl,
                tage: req.body.tags,
                user: req.userId
            });

        res.json({
            success: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Can not update the post'
        })
    }
}