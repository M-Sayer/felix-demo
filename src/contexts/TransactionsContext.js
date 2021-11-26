import React, { useEffect, useState } from 'react';
import TokenService from '../services/token-service';
import { TransactionsService } from '../services/transactions-service';
import dayjs from 'dayjs'

export const TransactionsContext = React.createContext({
  transactions: [],
  setTransactions: () => {},
  getTransactions: () => {},
  clearTransactions: () => {},
  setError: () => {},
  clearError: () => {},
  filterTransactions: () => {},
  transaction: null,
  setTransaction: () => {},
  createTransaction: false,
  setCreateTransaction: () => {},
  editTransaction: false,
  setEditTransaction: () => {},
  saveTransaction: () => {},
  deleteTransaction: () => {},
})

export const TransactionsProvider = props => {
  const [transactions, setTransactions] = useState([]);
  const [transaction, setTransaction] = useState(null)
  const [createTransaction, setCreateTransaction] = useState(false)
  const [editTransaction, setEditTransaction] = useState(false)
  const [error, setError] = useState(null);

  const clearTransactions = () => setTransactions([]);
  const clearError = () => setError(null);

  const filterTransactions = (transactions, property, value) => {
    return transactions.filter(trx => trx[property] === value);
  }

  const getTransactions = async () => {
    try {
      const { income, expenses } = await TransactionsService.getAllTransactions()
      income.forEach(item => item.type = 'income')
      expenses.forEach(item => item.type = 'expenses')
      // const sortedTransactions = sortTransactions([...income, ...expenses], 'date_created')
      const sorted = [...income, ...expenses].sort((a, b) => {
        if (dayjs(a.date_created).isAfter(dayjs(b.date_created))) return -1
        
        if (dayjs(a.date_created).isBefore(dayjs(b.date_created))) return 1

        return 0
      })
      setTransactions(sorted)
      console.log(sorted)
    }
    catch(error) {
      console.log(error)
    }
  }

  const saveTransaction = async values => {
    const response = createTransaction
      ? await TransactionsService.createTransaction(values)
      : await TransactionsService.updateTransaction(values, transaction.id)

    await getTransactions()

    return
  }

  const deleteTransaction = async (type, id) => {
    await TransactionsService.deleteTransaction(type, id)

    await getTransactions()

    return
  }

  useEffect(() => {
    TokenService.hasAuthToken() && getTransactions()
  }, [])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        setTransactions,
        getTransactions,
        transaction,
        setTransaction,
        clearTransactions,
        error,
        setError,
        clearError,
        filterTransactions,
        createTransaction,
        setCreateTransaction,
        editTransaction,
        setEditTransaction,
        saveTransaction,
        deleteTransaction,
      }}
    >
      {props.children}
    </TransactionsContext.Provider>
  );
}