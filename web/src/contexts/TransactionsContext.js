import React, { useEffect, useState } from 'react';
import TransactionsService from '../services/transactions-service';

export const TransactionsContext = React.createContext({
  transactions: [],
  setTransactions : ()=>{},
  clearTransactions : ()=>{},
  clearError: ()=>{},
  filterTransactions : ()=>{},
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

  const getTransactions = async () => {
    try {
      const { income, expenses } = await TransactionsService.getAllTransactions();
      const sortedTransactions = sortTransactions([...income, ...expenses], 'date_created');
      setTransactions(sortedTransactions);
      console.log(sortedTransactions)
    }
    catch(error) {
      console.log(error);
    }
  }

  useEffect(() => getTransactions(), [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions, 
        clearTransactions,
        error,
        setError,
        clearError,
        filterTransactions
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}