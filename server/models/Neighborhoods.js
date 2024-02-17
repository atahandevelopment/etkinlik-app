import mongoose from "mongoose";

const neighborHoodSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String,
    district_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Districts'
    }
})

export default mongoose.model('Neighborhoods', neighborHoodSchema);