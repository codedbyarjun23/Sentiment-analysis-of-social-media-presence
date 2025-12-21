const express = require('express');
const router = express.Router();

const Analysis = require('../models/Analysis');

const Sentiment = require('sentiment');
const sentimentAnalyzer = new Sentiment();

// Initialize Gemini (Optional/Removed for now as per request to use npm sentiment)
// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'AIza-placeholder');

router.post('/', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ msg: 'Please provide text to analyze' });
    }

    try {
        // Use npm sentiment
        const result = sentimentAnalyzer.analyze(text);

        // Map result to our schema
        let sentiment = 'Neutral';
        if (result.score > 0) sentiment = 'Positive';
        else if (result.score < 0) sentiment = 'Negative';

        // Calculate confidence (heuristic)
        // Sentiment package comparative is score / words.length. 
        // Range is roughly -5 to 5 per word usually. 
        // Let's normalize a bit.
        let confidence = 0.5 + (Math.abs(result.comparative) / 5);
        if (confidence > 0.99) confidence = 0.99;
        if (confidence < 0.5 && result.score !== 0) confidence = 0.6; // Boost confidence if there is a score

        const analysisResult = {
            sentiment,
            confidence,
            keywords: [...result.positive, ...result.negative],
            emotion: 'Neutral', // Sentiment pkg doesn't give emotion
            sarcasm: false
        };

        // Save to DB
        const newAnalysis = new Analysis({
            text,
            sentiment: analysisResult.sentiment,
            confidence: analysisResult.confidence,
            keywords: analysisResult.keywords,
            // Add new fields to Schema if needed, or store in 'keywords' for now?
            // For simplicity, we stick to existing Schema but we can add meta-data later.
        });

        await newAnalysis.save();

        // Emit real-time event
        const io = req.app.get('socketio');
        if (io) {
            io.emit('new_analysis', {
                id: newAnalysis._id,
                text: newAnalysis.text,
                sentiment: newAnalysis.sentiment,
                date: 'Just now', // Client will format normally, but this gives immediate feedback
                platform: 'Web'
            });
        }

        res.json(analysisResult);

    } catch (err) {
        console.error("Analysis Error Details:", err);
        if (err.name === 'MongooseError' || err.name === 'MongoError') {
            console.error("Database Error: Check your MONGO_URI in .env");
            return res.status(500).json({ msg: 'Database Connection Error. Please check server logs.' });
        }
        res.status(500).json({ msg: 'Server Error during analysis', error: err.message });
    }
});

// GET /api/analyze - Fetch recent analyses
router.get('/', async (req, res) => {
    try {
        const analyses = await Analysis.find().sort({ createdAt: -1 }).limit(20);
        res.json(analyses);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
