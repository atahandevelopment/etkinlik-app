import mongoose from "mongoose";


const bannerSchema = mongoose.Schema({
    title: {
        type: String,
    }, 
    description: {
        type: String,
    },
    url:{
        type: String,
    },
    is_active: {
        type: Boolean,
        default: false,
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images",
        required: true,
    }
},{timestamps: true});

export default mongoose.model("Banner", bannerSchema);