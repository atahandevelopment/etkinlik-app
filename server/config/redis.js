import { createClient } from 'redis';

export const redisClient = createClient({
    url: 'redis://172.21.208.1:6379',
});

redisClient.on('error', err => console.log('Redis Client Error', err));


await redisClient.connect()