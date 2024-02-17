import mongoose from "mongoose";


const imageSchema = mongoose.Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    }
})

const partnerSchema = mongoose.Schema({
    label: {
        type: String,
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Images"
    },
    url: {
        type: String,
    }
},{timestamps: true});

export default mongoose.model("Partner", partnerSchema);