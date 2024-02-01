import mongoose from "mongoose";

const neighborHoodSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String
})

export default mongoose.model('Neighborhoods', neighborHoodSchema);