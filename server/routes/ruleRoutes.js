// backend/routes/ruleRoutes.js
const express = require('express');
const router = express.Router();
const Rule = require('../models/Rule');

// Basic validation middleware
const validateRuleRequest = (req, res, next) => {
    const { name, ast } = req.body;
    if (!name || !ast) {
        return res.status(400).json({ error: 'Rule name and AST are required' });
    }
    next();
};

// Middleware for error handling
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

// Create a rule
router.post('/create', validateRuleRequest, asyncHandler(async (req, res) => {
    const { name, ast } = req.body;
    const newRule = new Rule({ name, ast });
    await newRule.save();
    res.status(201).json({ message: 'Rule created successfully', ruleId: newRule._id });
}));

// Combine rules
router.post('/combine', asyncHandler(async (req, res) => {
    const { name, rule1Id, rule2Id, operator } = req.body;
    if (!name || !rule1Id || !rule2Id || !operator) {
        return res.status(400).json({ error: 'Name, rule1Id, rule2Id, and operator are required' });
    }

    const combinedAst = {
        operator,
        left: { ruleId: rule1Id },
        right: { ruleId: rule2Id }
    };

    const newRule = new Rule({ name, ast: combinedAst });
    await newRule.save();
    res.status(201).json({ message: 'Combined rule created successfully', ruleId: newRule._id });
}));

// Evaluate a rule
router.post('/evaluate', asyncHandler(async (req, res) => {
    const { ruleId, data } = req.body;
    if (!ruleId || !data) {
        return res.status(400).json({ error: 'Rule ID and data are required' });
    }

    const rule = await Rule.findById(ruleId);
    if (!rule) {
        return res.status(404).json({ error: 'Rule not found' });
    }

    const result = await evaluateRule(rule.ast, data);
    res.status(200).json({ result });
}));

// Function to evaluate the rule's AST
async function evaluateRule(ruleAst, data) {
    const { operator, left, right } = ruleAst;

    // Handling nested rules
    if (left.ruleId) {
        const leftRule = await Rule.findById(left.ruleId);
        left.value = await evaluateRule(leftRule.ast, data);
    }
    if (right.ruleId) {
        const rightRule = await Rule.findById(right.ruleId);
        right.value = await evaluateRule(rightRule.ast, data);
    }

    switch (operator) {
        case 'AND':
            return left.value && right.value;
        case 'OR':
            return left.value || right.value;
        case 'EQUALS':
            return data[left] === right;
        case 'GREATER_THAN':
            return data[left] > right;
        case 'LESS_THAN':
            return data[left] < right;
        default:
            throw new Error('Unknown operator');
    }
}

// Error handling middleware
router.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

module.exports = router;
