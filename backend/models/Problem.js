const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    platform: { type: String, required: true },
    topic: { type: String, required: true },
    solved: { type: Boolean, default: true },
    solvedDate: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
