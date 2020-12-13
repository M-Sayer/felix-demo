import React, { useState } from 'react';

export const TransactionsContext = React.createContext({
  transactions: [],
  setTransactions : ()=>{},
  clearTransactions : ()=>{},
  clearError: ()=>{},
  filterTransactions : ()=>{},
  sortTransactions : ()=>{},
  setError : () => {},
})

export const TransactionsProvider = props => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  const clearTransactions = () => setTransactions([]);
  const clearError = () => setError(null);

  const filterTransactions = (transactions, property, value) => {
    return transactions.filter(trx => trx[property] === value);
  };

  const sortTransactions = (transactions, property = null) => {
    if(property === null) {
      return transactions.sort((a, b) => a - b);
    }
    return transactions.sort((a, b) => a[property] - b[property]);
  };

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions, 
        clearTransactions,
        error,
        setError,
        clearError,
        sortTransactions,
        filterTransactions
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}