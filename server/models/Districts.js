import mongoose from "mongoose";

const districtSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String
})

export default mongoose.model('Districts', districtSchema);