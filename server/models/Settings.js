import mongoose from "mongoose";

const taxSchema = mongoose.Schema({
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    district: {
        type: String,
    },
    tax_administration: {
        type: String,
    },
    tax_no: {
        type: String,
    }
});

const companyMailSchema = mongoose.Schema({
    title: {
        type: String,
    },
    email: {
        type: String,
    }
});

const settingsSchema = mongoose.Schema({
    phone: {
        type: String,
    },
    company_mails: {
        type: [companyMailSchema],
    },
    instagram: {
        type: String,
    },
    facebook: {
        type: String,
    },
    twitter: {
        type: String,
    },
    tax_informations: {
        type: taxSchema,
    },
    title: {
        type: String,
    }
}, {timestamps: true});

export default mongoose.model("Settings", settingsSchema);