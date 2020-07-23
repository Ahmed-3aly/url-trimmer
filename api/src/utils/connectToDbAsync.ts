import { config } from './config';
import mongoose from 'mongoose';
import { log } from './log';

export async function connectToDbAsync(): Promise<boolean> {
    if (config.DB_IN_MEMORY) {
        log('using in memory database');
        return Promise.resolve(true);
    }
    const connectionString =
        config.DB_PROTOCOL +
        config.DB_HOST +
        ':' +
        config.DB_PORT +
        '/' +
        config.DB_NAME;
    try{
        log('mongo -> connection attempted', {
            'connectionString': connectionString
        });
        await mongoose.connect(
            connectionString,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true,
            },
        );
        log('mongo -> connection ready');
        return true;
    }
    catch (x) {
        log('mongo -> connection failed');
        return false;
    }
}
