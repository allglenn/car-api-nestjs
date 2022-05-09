import * as moogoose from 'mongoose';

export const CarSchema = new moogoose.Schema({
    id: Number,
    brand: String,
    color: String,
    model: String
})