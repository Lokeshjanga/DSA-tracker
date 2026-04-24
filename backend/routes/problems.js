const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');

// Get all problems for logged in user
router.get('/', auth, async (req, res) => {
    try {
        const problems = await Problem.find({ userId: req.user.id }).sort({ solvedDate: -1 });
        res.json(problems);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add new problem
router.post('/', auth, async (req, res) => {
    try {
        const newProblem = new Problem({
            ...req.body,
            userId: req.user.id
        });

        const problem = await newProblem.save();

        // Update streak logic
        const user = await User.findById(req.user.id);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!user.lastActiveDate) {
            user.currentStreak = 1;
            user.longestStreak = 1;
        } else {
            const lastActive = new Date(user.lastActiveDate);
            lastActive.setHours(0, 0, 0, 0);
            const diffTime = Math.abs(today - lastActive);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                user.currentStreak += 1;
                if (user.currentStreak > user.longestStreak) {
                    user.longestStreak = user.currentStreak;
                }
            } else if (diffDays > 1) {
                user.currentStreak = 1;
            }
        }
        
        user.lastActiveDate = new Date();
        await user.save();

        res.json(problem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update problem
router.put('/:id', auth, async (req, res) => {
    try {
        let problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ msg: 'Problem not found' });

        if (problem.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        problem = await Problem.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(problem);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Delete problem
router.delete('/:id', auth, async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (!problem) return res.status(404).json({ msg: 'Problem not found' });

        if (problem.userId.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Problem.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Problem removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
