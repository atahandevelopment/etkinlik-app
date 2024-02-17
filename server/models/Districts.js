import mongoose from "mongoose";

const districtSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String,
    city_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cities'
    }
})

export default mongoose.model('Districts', districtSchema);