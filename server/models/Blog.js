import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    description: {
        type: String,
    }
},{timestamps: true});

export default mongoose.model('Blog', blogSchema);