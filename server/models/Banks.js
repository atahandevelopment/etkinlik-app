import mongoose from "mongoose";

const bankSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    branch: {
        type: String,
        required:true
    },
    branch_code: {
        type: String,
        required:true
    },
    account_number: {
        type: String,
        required:true
    },
    iban: {
        type: String,
        required:true
    }
});

export default mongoose.model('Banks', bankSchema);