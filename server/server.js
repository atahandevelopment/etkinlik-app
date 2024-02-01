import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import eventRouter from './routes/eventRouter.js';
import venueList from './routes/venueList.js';
import formatListRouter from './routes/formatListRouter.js';
import categoryRouter from './routes/categoryRoute.js';
import placesListRoute from './routes/placesListRoute.js';
import searchServiceRoute from './routes/searchServiceRoute.js';
import { startDataSync } from './config/dataSync.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

const apiSecret = process.env.APP_API_SECRET;

app.use(`${apiSecret}/users`, userRouter);
app.use(`${apiSecret}/events`, eventRouter);
app.use(`${apiSecret}/venues`, venueList);
app.use(`${apiSecret}/format-list`, formatListRouter);
app.use(`${apiSecret}/categories`, categoryRouter);
app.use(`${apiSecret}/places`, placesListRoute);
app.use(`${apiSecret}/search`, searchServiceRoute);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    mongoose.connect(process.env.EVENT_APP_DB_URL)
        .then(() => console.log('Mongodb bağlantısı başarılı.' + `${PORT}'inci portta dinliyor.`))
            .catch(err => console.log(err));
})

// startDataSync();