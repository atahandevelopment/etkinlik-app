import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    is_read: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

export default mongoose.model('Message', messageSchema);