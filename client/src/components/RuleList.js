import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './../assets/Form.css';

const RuleList = () => {
  const [rules, setRules] = useState([]);

  useEffect(() => {
    const fetchRules = async () => {
      try {
        const response = await api.getRules();
        setRules(response.data);
      } catch (error) {
        console.error('Failed to fetch rules');
      }
    };
    fetchRules();
  }, []);

  return (
    <div className="rule-list">
      <h2>Existing Rules</h2>
      {rules.length === 0 ? (
        <p>No rules available.</p>
      ) : (
        <ul>
          {rules.map((rule, index) => (
            <li key={index}>{rule.ruleString}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RuleList;
