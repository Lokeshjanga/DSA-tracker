const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Problem = require('../models/Problem');
const auth = require('../middleware/authMiddleware');

router.get('/profile', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-passwordHash');
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const problems = await Problem.find({ userId: req.user.id });
        const totalSolved = problems.length;

        // Check if streak is broken
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let currentStreak = user.currentStreak;
        
        if (user.lastActiveDate) {
            const lastActive = new Date(user.lastActiveDate);
            lastActive.setHours(0, 0, 0, 0);
            const diffTime = Math.abs(today - lastActive);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 1) {
                currentStreak = 0;
                user.currentStreak = 0;
                await user.save();
            }
        }

        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayEnd.getDate() + 1);
        const todaySolved = problems.filter(p => {
            const d = new Date(p.solvedDate);
            return d >= todayStart && d < todayEnd;
        }).length;

        res.json({
            ...user._doc,
            currentStreak,
            totalSolved,
            todaySolved
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/goal', auth, async (req, res) => {
    try {
        const { dailyGoal } = req.body;
        if (!dailyGoal || dailyGoal < 1 || dailyGoal > 50) {
            return res.status(400).json({ msg: 'Goal must be between 1 and 50' });
        }
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { dailyGoal: Math.floor(dailyGoal) },
            { new: true }
        ).select('-passwordHash');
        res.json({ dailyGoal: user.dailyGoal });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
