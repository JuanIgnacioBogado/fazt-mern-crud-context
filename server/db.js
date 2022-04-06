import mongoose from 'mongoose';
import {MONGODB_URI} from './config.js';

(async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('DB is connected:', mongoose.connection.name);
    } catch (error) {
        console.log(error);   
    }
})();