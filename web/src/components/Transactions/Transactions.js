import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';
import './Transactions.css';

import './Transactions.css'
import '../../styles/ButtonStyles.css'
import '../../styles/index.css'

class Transactions extends Component {
  static contextType = TransactionsContext;

  renderTransactionParams(transaction) {
    if('income_amount' in transaction) {
      return `/transaction/income/${transaction.id}`;
    }

    return `transaction/expenses/${transaction.id}`;
  }

  renderTransactions(transactions) {
    return transactions.map((trx, i) => {
      return (
        <li 
          className='dataFlexRow'
          key={i}
        >
          <span className='userData2'>
            {trx.income_category || trx.expense_category}
          </span>
          <span
            className=
            {(trx.income_amount)
            ? 'income userData2 middleColumn'
            : 'expenses userData2 middleColumn'
            }
            >
            {trx.income_amount || trx.expense_amount}
          </span>
      
          <button
            className='btn tertiaryBtn'
            onClick={() =>
              this.props.history.push(this.renderTransactionParams(trx))
            }
          >
            Details
          </button>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const { income, expenses } = await TransactionsService.getAllTransactions();
      const sortedTransactions = this.context.sortTransactions([...income, ...expenses], 'date_created');
      this.context.setTransactions(sortedTransactions);
    }
    catch(error) {
      console.log(error);
    }
  }

  render() {
    const { transactions = [] } = this.context;

    return (
      <article className='AllTransactions'>
        <h2 className='sectionHeaderALT'>
          All Transactions
        </h2>
        <ul className='overviewSection'>
          {
            (transactions.length)
              ? this.renderTransactions(transactions)
              : ''
          }
        </ul>
        <button
          className='btn tertiaryBtn'
          onClick={() =>
            this.props.history.push('/')}
            type='click'
        >
          Back
        </button>
      </article>
    );
  }
}

export default Transactions;