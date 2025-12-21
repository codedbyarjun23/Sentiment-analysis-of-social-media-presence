const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    sentiment: {
        type: String,
        required: true,
        enum: ['Positive', 'Negative', 'Neutral'],
    },
    confidence: {
        type: Number,
        required: true,
    },
    keywords: {
        type: [String],
        default: [],
    },
    platform: {
        type: String,
        default: 'Web',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
