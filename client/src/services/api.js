import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Use port 8000 here
});

// Define the API functions
const apiService = {
  createRule: (rule) => api.post('/rules', rule),
  getRules: () => api.get('/rules'),
  evaluateRule: (data) => api.post('/rules/evaluate', data),
};

// Export the apiService object
export default apiService;
