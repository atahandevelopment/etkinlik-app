import mongoose from "mongoose";

const citiesSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String
})

export default mongoose.model('Cities', citiesSchema);