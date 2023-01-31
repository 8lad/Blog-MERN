import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    postId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true,
    },
    imageUrl: String,
    user: {
        fullName: String,
        avatarUrl: String
    },
}, {
    timestamps: true,
});

export default mongoose.model('Comment', CommentSchema);