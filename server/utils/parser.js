class Node {
  constructor(type, left = null, right = null, value = null) {
    this.type = type;   // 'operator' or 'operand'
    this.left = left;   // left child node (for operators)
    this.right = right; // right child node (for operators)
    this.value = value; // operand value (for conditions)
  }
}

function createAST(ruleString) {
  // Remove whitespace from the rule string
  ruleString = ruleString.replace(/\s+/g, '');

  // Helper function to parse conditions like 'age > 30'
  function parseCondition(condition) {
    const match = condition.match(/(\w+)([><=]+)(.+)/);
    if (match) {
      const [_, field, operator, value] = match;
      return new Node('operand', null, null, { field, operator, value });
    }
    throw new Error('Invalid condition format');
  }

  // Recursive function to parse the rule string and build the AST
  function parseExpression(expression) {
    // Base case: If there's no "AND" or "OR", it's a simple condition
    if (!expression.includes('AND') && !expression.includes('OR')) {
      return parseCondition(expression);
    }

    // Find the main operator (AND/OR) and split the expression
    let operator = null;
    let parts = [];

    if (expression.includes('AND')) {
      parts = expression.split('AND');
      operator = 'AND';
    } else if (expression.includes('OR')) {
      parts = expression.split('OR');
      operator = 'OR';
    }

    // Recursively parse the left and right parts of the expression
    const left = parseExpression(parts[0]);
    const right = parseExpression(parts[1]);

    // Return an operator node with left and right children
    return new Node('operator', left, right, operator);
  }

  // Start the parsing process and return the root of the AST
  return parseExpression(ruleString);
}

function evaluateAST(node, data) {
  if (node.type === 'operand') {
    return evaluateCondition(node.value, data);
  }

  const leftEval = evaluateAST(node.left, data);
  const rightEval = evaluateAST(node.right, data);

  if (node.type === 'operator') {
    return node.value === 'AND' ? leftEval && rightEval : leftEval || rightEval;
  }
}

function evaluateCondition(condition, data) {
  const { field, operator, value } = condition;
  
  // Convert data value and condition value to appropriate types
  const dataValue = data[field];
  const conditionValue = isNaN(value) ? value.replace(/['"]/g, '') : Number(value);

  switch (operator) {
    case '>':
      return dataValue > conditionValue;
    case '<':
      return dataValue < conditionValue;
    case '==':
      return dataValue == conditionValue;
    case '>=':
      return dataValue >= conditionValue;
    case '<=':
      return dataValue <= conditionValue;
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

module.exports = { createAST, evaluateAST };
