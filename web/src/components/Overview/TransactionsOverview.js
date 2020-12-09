import React, { Component } from 'react';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';

class TransactionsOverview extends Component {
  static contextType = TransactionsContext;

  renderTransactions(transactions) {
    const transactionsList = [];
    let i = 0;

    for(const trx of transactions) {
      if(i < 3 && i < transactions.length) {
        transactionsList.push(
          <li 
            className='userData2'
            key={i}
          >
            <div
              className='dataFlexRow'
            >
              <span>
                {trx.income_category || trx.expense_category}:
              </span>
              <span
                className=
                  {(trx.income_amount)
                    ? 'income'
                    : 'expenses'
                  }
              >
                {trx.income_amount || trx.expense_amount}
              </span>
            </div>
          </li>
        );
      }
      i++;
    }

    return (
      <ul>
        {transactionsList}
      </ul>
    );
  }

  async fetchData() {
    try {
      const { income, expenses } = await TransactionsService.getAllTransactions();
      const sortedTransactions = this.context.sortTransactions([...income, ...expenses], 'date_created');
      this.context.setTransactions(sortedTransactions);
    }
    catch(error) {
      this.context.setError(error);
    }
  };

  componentDidMount() {
    this.fetchData()
  };

  render() {
    const { transactions = [] } = this.context;

    return (
      <article
        className='overviewSection'
      >
        <h2
          className='sectionHeader'
        >
          Transactions Overview
        </h2>
        {(transactions.length)
            ? this.renderTransactions(transactions)
            : ''
        }
        <div
          className='btnsFlexRow'
        >
          <button
            className='btn tertiaryBtn'
            onClick={() =>
              this.props.history.push('/createtransaction')}
              type='click'
          >
            +
          </button>
          {(transactions.length)
              ? <button
                  className='btn tertiaryBtn'
                  onClick={() =>
                    this.props.history.push('/transactions')
                  }
                  type='click'
                >
                  See All
                </button>
              : ''
          }
        </div>
      </article>
    );
  }
}

export default TransactionsOverview;