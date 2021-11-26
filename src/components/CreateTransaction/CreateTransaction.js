import React from 'react';
import TransactionForm from '../TransactionForm/TransactionForm';
import TransactionsService from '../../services/transactions-service';
import TransactionsContext from '../../contexts/TransactionsContext';


export default class CreateTransaction extends React.Component {
	static contextType = TransactionsContext;

	state = {
		error: null,
	};

	handleSubmit = async (e, data) => {
		e.preventDefault();
		try {
			//change expense amount to a negative number before POSTing to server
			if (data.type === 'expenses') {
				if (data.amount > 0) {
					data.amount *= -1;
				}
			}
      await TransactionsService.createTransaction(data);
      this.props.history.push('/');
		} catch(error) {
			this.setState({...error});
		};
	};

	handleCancel = e => {
		e.preventDefault()
		this.props.history.push('/')
	};

	render() {
		return (
			<>
				<div role='alert'>
							{this.state.error && <p className='error-alert'>{this.state.error}</p>}
				</div>
				<TransactionForm
				handleCancel = {this.handleCancel}
				handleSubmit = {this.handleSubmit}
				editing = {false}
				/>
			</>
		);
	};
};
