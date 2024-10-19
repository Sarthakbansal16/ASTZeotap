// src/components/CombineRules.js
import React, { useState } from 'react';
import axios from 'axios';
import './CombineRules.css';

function CombineRules() {
    const [name, setName] = useState('');
    const [rule1Id, setRule1Id] = useState('');
    const [rule2Id, setRule2Id] = useState('');
    const [operator, setOperator] = useState('');

    const handleCombine = async () => {
        try {
            const response = await axios.post('/api/rules/combine', { name, rule1Id, rule2Id, operator });
            alert('Combined rule created successfully: ' + response.data.ruleId);
            setName('');
            setRule1Id('');
            setRule2Id('');
            setOperator('');
        } catch (error) {
            alert('Failed to combine rules: ' + error.message);
        }
    };

    return (
        <div className="combine-rules">
            <h2>Combine Rules</h2>
            <input
                type="text"
                placeholder="Combined Rule Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Rule 1 ID"
                value={rule1Id}
                onChange={(e) => setRule1Id(e.target.value)}
            />
            <input
                type="text"
                placeholder="Rule 2 ID"
                value={rule2Id}
                onChange={(e) => setRule2Id(e.target.value)}
            />
            <input
                type="text"
                placeholder="Operator (AND/OR)"
                value={operator}
                onChange={(e) => setOperator(e.target.value)}
            />
            <button onClick={handleCombine}>Combine Rules</button>
        </div>
    );
}

export default CombineRules;
