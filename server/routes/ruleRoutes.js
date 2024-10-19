const express = require('express');
const { createRule, evaluateRule, getRules } = require('../controllers/ruleController');
const router = express.Router();

router.post('/', createRule); // POST /api/rules
router.get('/', getRules); // GET /api/rules
router.post('/evaluate', evaluateRule); // POST /api/rules/evaluate

module.exports = router;
