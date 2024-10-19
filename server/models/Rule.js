// backend/models/Rule.js
const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    ast: {
        type: Object,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Rule', ruleSchema);
