import config from '../config';
import TokenService from './token-service';

const url = config.API_ENDPOINT;

export const getAlerts = async () => {
  try {
    const alerts = await fetch(`${url}/alerts`, {
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
      }
    });

    return alerts.json();
  } catch (error) {
    console.log(error)
  }
};

export const updateAlert = async (id, data) => {
  try {
    await fetch(`${url}/alerts/${id}`, {
      'method': 'PATCH',
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error)
  }
}