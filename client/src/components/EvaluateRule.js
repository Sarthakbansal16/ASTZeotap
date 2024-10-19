// src/components/EvaluateRule.js
import React, { useState } from 'react';
import axios from 'axios';
import './EvaluateRule.css';

function EvaluateRule() {
    const [ruleId, setRuleId] = useState('');
    const [data, setData] = useState('');
    const [result, setResult] = useState(null);

    const handleEvaluate = async () => {
        try {
            const response = await axios.post('/api/rules/evaluate', { ruleId, data: JSON.parse(data) });
            setResult(response.data.result);
        } catch (error) {
            alert('Failed to evaluate rule: ' + error.message);
        }
    };

    return (
        <div className="evaluate-rule">
            <h2>Evaluate Rule</h2>
            <input
                type="text"
                placeholder="Rule ID"
                value={ruleId}
                onChange={(e) => setRuleId(e.target.value)}
            />
            <textarea
                placeholder="Data (JSON format)"
                value={data}
                onChange={(e) => setData(e.target.value)}
            />
            <button onClick={handleEvaluate}>Evaluate Rule</button>
            {result !== null && <p>Result: {result ? 'True' : 'False'}</p>}
        </div>
    );
}

export default EvaluateRule;
