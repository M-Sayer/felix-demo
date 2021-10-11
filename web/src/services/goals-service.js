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

  async createGoal(goal) {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/goals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(goal)
      })
  
      if (!response.ok) {
        const error = response.json()
        return Promise.reject(error)
      }

      return response.json()
    } catch (error) {
      console.log(error)
    }
  },

  async updateGoal(goal, id) {
    try {
      const response = await fetch(`${config.API_ENDPOINT}/goals/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(goal)
      });
  
      if(!response.ok) {
        const error = await response.json();
        return Promise.reject(error);
      }
  
      return response.json();
    } catch (error) {
      console.log(error)
    }
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