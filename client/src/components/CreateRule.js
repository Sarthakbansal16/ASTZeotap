// src/components/CreateRule.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreateRule.css';

function CreateRule() {
    const [name, setName] = useState('');
    const [ast, setAst] = useState('');

    const handleCreate = async () => {
        try {
            const response = await axios.post('/api/rules/create', { name, ast: JSON.parse(ast) });
            alert('Rule created successfully: ' + response.data.ruleId);
            setName('');
            setAst('');
        } catch (error) {
            alert('Failed to create rule: ' + error.message);
        }
    };

    return (
        <div className="create-rule">
            <h2>Create a New Rule</h2>
            <input
                type="text"
                placeholder="Rule Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <textarea
                placeholder="Rule AST (JSON format)"
                value={ast}
                onChange={(e) => setAst(e.target.value)}
            />
            <button onClick={handleCreate}>Create Rule</button>
        </div>
    );
}

export default CreateRule;
