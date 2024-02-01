import mongoose from "mongoose";


const eventSchema = mongoose.Schema({
    id: Number,
    name: String,
    slug: String,
    url: String,
    content: String,
    start: Date,
    end: Date,
    is_free: Boolean,
    poster_url: String,
    ticket_url: String,
    phone: String,
    email: String,
    facebook_url: String,
    twitter_url: String,
    hashtag: String,
    web_url: String,
    live_url: String,
    android_url: String,
    ios_url: String,
    format: {
      id: Number,
      name: String,
      slug: String,
    },
    category: {
      id: Number,
      name: String,
      slug: String,
    },
    venue: {
      id: Number,
      name: String,
      slug: String,
      about: String,
      lat: String,
      lng: String,
      status: Number,
      phone: String,
      web_url: String,
      facebook_url: String,
      twitter_url: String,
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
    },
    tags: [
      {
        id: Number,
        name: String,
        slug: String,
      },
    ],
  });

  export default mongoose.model('Events', eventSchema);