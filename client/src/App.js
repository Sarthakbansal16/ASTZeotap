import React from 'react';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import RuleEvaluator from './components/RuleEvaluator';

function App() {
  return (
    <div className="app">
      <h1>Rule Engine</h1>
      <div className="container">
        <RuleForm />
        <RuleList />
        <RuleEvaluator />
      </div>
    </div>
  );
}

export default App;
