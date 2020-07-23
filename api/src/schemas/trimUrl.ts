import mongoose from 'mongoose';
import { config } from '../utils';

const schema = new mongoose.Schema(
    {
        address: {
            type: String,
            required: 'address is required.'
        },
        trimmed: {
            type: String,
            required: 'trimmed is required.'
        }
    },
    {
        autoCreate: true
    }
);

export const trimUrl = mongoose
    .model(
        config.DB_LIST,
        schema,
    );
