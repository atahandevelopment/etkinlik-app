import mongoose from "mongoose"

const imageSchema = mongoose.Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
});

const imagesSchema = mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String,
    },
    is_main:{
        type: Boolean,
        default: false
    }
},{timestamps: true});

export default mongoose.model("Images", imagesSchema);