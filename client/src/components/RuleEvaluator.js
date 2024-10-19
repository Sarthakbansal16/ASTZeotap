import React, { useState } from 'react';
import api from '../services/api';
import './../assets/Form.css';

const RuleEvaluator = () => {
  const [data, setData] = useState({ age: '', department: '', salary: '', experience: '' });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEvaluate = async () => {
    try {
      const response = await api.evaluateRule(data);
      setResult(response.data.result);
      setError('');
    } catch (error) {
      setError('Failed to evaluate rule.');
    }
  };

  return (
    <div className="rule-evaluator">
      <h2>Evaluate Rule</h2>
      <div className="form-group">
        <label>Age</label>
        <input type="number" name="age" value={data.age} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Department</label>
        <input type="text" name="department" value={data.department} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Salary</label>
        <input type="number" name="salary" value={data.salary} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Experience</label>
        <input type="number" name="experience" value={data.experience} onChange={handleInputChange} />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button onClick={handleEvaluate}>Evaluate Rule</button>
      {result !== null && <div className="result">Result: {result ? 'Valid' : 'Invalid'}</div>}
    </div>
  );
};

export default RuleEvaluator;
