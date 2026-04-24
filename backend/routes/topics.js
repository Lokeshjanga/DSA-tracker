const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');
const Problem = require('../models/Problem');
const auth = require('../middleware/authMiddleware');

const defaultTopics = [
    'Arrays', 'Strings', 'Linked Lists', 'Stack', 'Queue', 
    'Trees', 'Graphs', 'Dynamic Programming', 'Backtracking', 
    'Greedy', 'Binary Search'
];

router.get('/', auth, async (req, res) => {
    try {
        let topics = await Topic.find();
        if (topics.length === 0) {
            const topicDocs = defaultTopics.map(t => ({ name: t, totalProblems: 50 })); // Hardcoded total for now
            topics = await Topic.insertMany(topicDocs);
        }

        // We also want to send how many problems the user has solved in each topic
        const userProblems = await Problem.find({ userId: req.user.id });
        
        const topicsWithProgress = topics.map(topic => {
            const solved = userProblems.filter(p => p.topic === topic.name).length;
            return {
                id: topic._id,
                name: topic.name,
                totalProblems: topic.totalProblems,
                solved
            };
        });

        res.json(topicsWithProgress);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:topicName', auth, async (req, res) => {
    try {
        const problems = await Problem.find({ userId: req.user.id, topic: req.params.topicName });
        res.json(problems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
