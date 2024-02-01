import mongoose from "mongoose";

const venuesSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String,
    about: Object,
    lat: String,
    lng: String,
    status: Number,
    phone: String,
    web_url: Object,
    facebook_url: Object,
    twitter_url: Object,
    city: {
        id: Number,
        name: String,
        slug: String,
    },
    district: {
        id: Number,
        name: String,
        slug: String,
    },
    neighborhood: {
        id: Number,
        name: String,
        slug: String,
    },
    address: String,
})

export default mongoose.model('Venues', venuesSchema);