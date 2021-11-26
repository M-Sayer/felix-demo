import React from 'react';
import TransactionsContext from '../../contexts/TransactionsContext';
import TransactionsService from '../../services/transactions-service';
import Transaction from '../../components/Transaction/Transaction';

import './TransactionRoute.css';
import { date } from 'yup';

export default class TransactionRoute extends React.Component{
  static contextType = TransactionsContext;

  /**
   * transaction : {
   *    amount : [int],
   *    description : [str],
   *    id : [int],
   *    name : [str],
   *    category : [str],
   *    date_created : [str],
   *    
   *    type : (this.props.match.params.type)
   * }
   */
  state = {
    transaction: {},
  }

  handleChange = data => {
    this.setState({ transaction : data})
  }

  componentDidMount = () => {
      const {type, id} = this.props.match.params;

      TransactionsService.getSingleTransaction(type, id)
      .then(res => this.setState({
        transaction: {...res, type: type}
      }))
      .catch(error => this.context.setError(error))
    }

  componentWillUnmount = () => {
      this.context.clearError();
  }

  render(){
    return(
      <section className='single_transaction'>
        <h2 className='single_transaction_header sectionHeaderALT'>
          Transaction
        </h2> 
        <Transaction
          handleChange={this.handleChange}
          transaction={this.state.transaction}
          {...this.props}
          />
      </section>
    );
  }
}