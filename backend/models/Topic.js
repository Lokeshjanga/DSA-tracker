const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalProblems: { type: Number, default: 0 }
});

module.exports = mongoose.model('Topic', TopicSchema);
