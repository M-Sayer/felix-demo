import React, { Component } from 'react';

const TransactionsContext = React.createContext({
  transactions: [],
  setTransactions : ()=>{},
  clearTransactions : ()=>{},
  clearError: ()=>{},
  filterTransactions : ()=>{},
  sortTransactions : ()=>{},
  setError : () => {},
})

export default TransactionsContext;

export class TransactionsProvider extends Component {
  state = {
    transactions: [],
    error: null
  }

  setTransactions = (transactions) => {
    this.setState({transactions});
  }

  clearTransactions = () => {
    this.setState({transactions: []});
  }

  clearError = () => this.setError({error : null});

  filterTransactions = (transactions, property, value) => {
    return transactions.filter(trx => trx[property] === value);
  }

  sortTransactions = (transactions, property = null) => {
    if(property === null) {
      return transactions.sort((a, b) => a - b);
    }
    return transactions.sort((a, b) => a[property] - b[property]);
  }

  // Pending stretch error handling
  setError = (error) => {
    this.setState({error});
  }

  render() {
    return (
      <TransactionsContext.Provider 
        value={{ 
          transactions: this.state.transactions,
          setTransactions: this.setTransactions,
          clearTransactions: this.clearTransactions,
          clearError: this.clearError,

          filterTransactions: this.filterTransactions,
          sortTransactions: this.sortTransactions,

          error: this.state.error,
          setError: this.setError,
        }}>
        {this.props.children}
    </TransactionsContext.Provider>
    );
  }
}
