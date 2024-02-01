import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        reqired: true
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events',
    },
    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Venues',
    },
    comment: {
        text: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
})

export default mongoose.model('Comments', commentSchema);