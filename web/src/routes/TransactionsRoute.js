import React from 'react';
import Transactions from '../components/Transactions/Transactions';

const TransactionsRoute = (props) => {
  return (
    <>
      <Transactions
        {...props}
      />
    </>
  );
}

export default TransactionsRoute;