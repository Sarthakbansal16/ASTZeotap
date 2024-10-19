const Rule = require('../models/Rule');
const { createAST, evaluateAST } = require('../utils/parser.js');

// Create a rule and store the AST in the database
exports.createRule = async (req, res) => {
  const { rule } = req.body;
  try {
    const ast = createAST(rule);
    const newRule = new Rule({ ruleString: rule, ast });
    await newRule.save();
    res.status(201).json(newRule);
  } catch (error) {
    res.status(500).json({ error: 'Error creating rule' });
  }
};

// Evaluate a rule based on the provided data
exports.evaluateRule = async (req, res) => {
  const { ruleId, data } = req.body;
  try {
    const rule = await Rule.findById(ruleId);
    if (!rule) return res.status(404).json({ error: 'Rule not found' });
    
    const result = evaluateAST(rule.ast, data);
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Error evaluating rule' });
  }
};
