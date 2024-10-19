import React, { useState } from 'react';
import './../assets/Form.css';
import api from '../services/api';

const RuleForm = () => {
  const [ruleString, setRuleString] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!ruleString) {
      setError('Rule cannot be empty.');
      return;
    }

    try {
      await api.createRule({ rule: ruleString });
      setRuleString('');  // Clear the input field
      setError('');       // Clear the error
    } catch (error) {
      setError('Failed to create rule.');
    }
  };

  return (
    <form className="rule-form" onSubmit={handleSubmit}>
      <h2>Create a New Rule</h2>
      <input
        type="text"
        value={ruleString}
        onChange={(e) => setRuleString(e.target.value)}
        placeholder="Enter rule (e.g., age > 30 AND department == 'Sales')"
        className={error ? 'error-input' : ''}
      />
      {error && <div className="error-message">{error}</div>}
      <button type="submit">Create Rule</button>
    </form>
  );
};

export default RuleForm;
