import config from '../config';
import TokenService from './token-service';

const GoalsService = {
  async getGoal(id) {
    const settings = {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      },
    }

    // http://localhost:8000/api/goals/goal/:id
    const response = await fetch(`${config.API_ENDPOINT}/goals/${id}`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  },

  // getAllGoals
  async getGoals() {
    const settings = {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      },
    }
    
    // http://localhost:8000/api/goals
    const response = await fetch(`${config.API_ENDPOINT}/goals`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  },

  async createUpdateGoal(goal, goalId = '', method) {
    const settings = {
      'method': `${method}`,
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      },
      'body': JSON.stringify(goal)
    }
    
    // http://localhost:8000/api/goals
    const response = await fetch(`${config.API_ENDPOINT}/goals/${goalId}`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  },

  async deleteGoal(goalId) {
    const settings = {
      'method': 'DELETE',
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      }
    }
    
    // http://localhost:8000/api/goals
    const response = await fetch(`${config.API_ENDPOINT}/goals/${goalId}`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return response.json();
  },
}

export default GoalsService;