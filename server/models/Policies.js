import mongoose from "mongoose";

const policySchema = mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Images',
    },
    maddeler: {
        type: [String],
    }
},{timestamps: true});

export default mongoose.model('Policies', policySchema);