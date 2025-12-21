const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');

// Helper for relative time
function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return Math.floor(seconds) + " seconds ago";
}

// GET /api/dashboard/summary
router.get('/summary', async (req, res) => {
    try {
        const totalPosts = await Analysis.countDocuments();

        const positiveCount = await Analysis.countDocuments({ sentiment: 'Positive' });
        const neutralCount = await Analysis.countDocuments({ sentiment: 'Neutral' });
        const negativeCount = await Analysis.countDocuments({ sentiment: 'Negative' });

        let positive = 0, neutral = 0, negative = 0;

        if (totalPosts > 0) {
            positive = Math.round((positiveCount / totalPosts) * 100);
            neutral = Math.round((neutralCount / totalPosts) * 100);
            negative = Math.round((negativeCount / totalPosts) * 100);
        }

        res.json({
            totalPosts,
            overallSentiment: { positive, neutral, negative },
            engagement: 'N/A', // Not tracked yet
            trend: 'N/A', // Not calculated yet
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// GET /api/dashboard/posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Analysis.find().sort({ createdAt: -1 }).limit(10);

        const formattedPosts = posts.map(post => ({
            id: post._id,
            text: post.text,
            platform: post.platform || 'Web',
            sentiment: post.sentiment,
            date: timeAgo(post.createdAt)
        }));

        res.json(formattedPosts);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
