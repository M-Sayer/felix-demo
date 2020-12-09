import config from '../config';
import TokenService from './token-service';

// config.API_ENDPOINT = http://localhost:8000/api
const TransactionsService = {
      getSingleTransaction(type,id){
        return fetch(`${config.API_ENDPOINT}/transactions/${type}/${id}`, {
          'headers' :{
              'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
              'Content-Type' : 'application/json',
          }
        })
            .then(res =>        
                (!res.ok)
                ?res.json().then(e => Promise.reject(e))
                :res.json()
                )
    },
    updateSingleTransaction(transaction){
        return fetch(`${config.API_ENDPOINT}/transactions/${transaction.type}/${transaction.id}`, {
            'method' : 'PATCH',
            'headers' : {
              'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
              'Content-Type' : 'application/json'
            },
            body : JSON.stringify(transaction)
        })
    },
    async deleteSingleTransaction(type,id) {
      await fetch(`${config.API_ENDPOINT}/transactions/${type}/${id}`,{
        'method' : 'DELETE',
        'headers' : {
          'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
          'Content-Type' : 'application/json'
        }
      })
    },
  async getAllTransactions() {
    const settings = {
      'method': 'GET',
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      },
    }

    // http://localhost:8000/api/transactions/
    const response = await fetch(`${config.API_ENDPOINT}/transactions`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }
    return response.json();
  },

  async createTransaction( newTransactionObject ) {
    //newTransactionObject should contain name, description, amount, category, and type
    const settings = {
      'method': 'POST',
      'body' : JSON.stringify(newTransactionObject),
      'headers': {
        'Authorization': `Bearer ${TokenService.getAuthToken(config.TOKEN_KEY)}`,
        'Content-Type' : 'application/json'
      },
    }
    //POST the new transaction object to the server
    const response = await fetch(`${config.API_ENDPOINT}/transactions`, settings);

    if(!response.ok) {
      const error = await response.json();
      return Promise.reject(error);
    }

    return await response;
  }
}

export default TransactionsService;