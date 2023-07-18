const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'food must have a name.'],
    },
    calorie: {
        type: Number,
        required: [true, 'food must have a calorie.'],
    },
    summary: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;