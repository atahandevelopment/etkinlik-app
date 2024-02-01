import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String
})

export default mongoose.model('Categories', categorySchema);