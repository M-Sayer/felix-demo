import React from 'react';
import TransactionForm from '../TransactionForm/TransactionForm'

import { Button } from '../Misc/Misc';
import TransactionsService from '../../services/transactions-service';
import moment from 'moment';

import './transaction.css'

export default class Transaction extends React.Component {  

  state = {
    edit: false,
  }

  static defaultProps = {
    transaction : {
      amount: "",
      category: "",
      date_created: "",
      description: "",
      id: 0,
      name: "",
      type: "",
    },
    handleChange : () => {},
    history : {
      push : () => {}
    },
    match : {
      params : {
        type : '',
        id : 0
      }
    }
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit })
  }

  handleDelete = async () => {
    const {type, id} = this.props.match.params;
    await TransactionsService.deleteSingleTransaction(type,id)
    this.props.history.push('/')
  }

  handleSubmit = (ev, data) => {
    ev.preventDefault();
    this.props.handleChange(data)
    if (data.type === 'expenses') data.amount *= -1;
    TransactionsService.updateSingleTransaction(data);
    this.toggleEdit();
  }

  handleCancel = ev => {
    ev.preventDefault();
    this.toggleEdit();
  }

  renderTransaction = () => {
    const {name, date_created, amount, category, description } = this.props.transaction;
    const {type} = this.props.match.params; 
    return(
      !this.state.edit ?
      (
      <div className='transaction_wrapper'>
        <div className='transactionInfo_wrapper'>
          <div className='text_info_divider'>
          <p className='transaction name'>{name}</p>
          <p className='transaction date'>{moment(date_created).format('MM/DD/YYYY')}</p>
          <p className='transaction category'>{category}</p>
          <p className='transaction description'>{description}</p>
          </div>
          <div className='amount_wrapper'>
            <p className={`transaction ${type} amount`}>${amount}</p>
          </div>
        </div>
        <div className='button_wrapper'>
          <button
            onClick={this.toggleEdit}
            className='btn secondaryBtnALT'
          >
            Edit
          </button>
          <button
            onClick={this.handleDelete}
            className='btn cancel secondaryBtnALT'
          >
            Delete
          </button>
        </div>
      </div>
        )
        :
        (
          <>
            <TransactionForm
              handleCancel = {this.handleCancel}
              handleChange = {this.props.handleChange} 
              handleSubmit = {this.handleSubmit}
              transaction = {this.props.transaction} //remove date from props
              editing = {true}
            />
          </>
        )
    )
  }

  
  render(){
    return (
      <div className='formContainer'>
        {this.renderTransaction()}
      </div>
    );
  }
}