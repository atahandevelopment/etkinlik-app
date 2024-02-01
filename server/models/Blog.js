import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
    }
},{timestamps: true});

export default mongoose.model('Blog', blogSchema);