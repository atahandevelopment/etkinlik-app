import mongoose from "mongoose";

const formatSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String
})

export default mongoose.model('Formats', formatSchema);