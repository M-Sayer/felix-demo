import React from 'react';
import {Button} from '../Misc/Misc';
import './TransactionForm.css';

export default class TransactionForm extends React.Component {

  static defaultProps = {
    handleCancel: () => {},
    handleSubmit: () => {},
    editing: false,
    transaction: {
      amount: "",
      category: "",
      description: "",
      name: "",
      type: "",
    }
  }; 

	state = {
    amount: "",
    category: "",
    description: "",
    name: "",
    type: "",
  };

  componentDidMount() {
    if (this.props.transaction) {
      this.setState({...this.props.transaction})
    }
  };

  handleChange = event => {
    event.preventDefault();
    const {name , value} = event.target;
    this.setState({
      ...this.state,
      [name]: event.target.type === 'number' ? parseFloat(value) : value
    });
  };

  renderOptions = arr =>{
    if(arr.length){
      return arr.map((item, i) => {
        return (
          <option
          key={i}
          name={item}
          value={item}
          >
          {item}
          </option>
        );
      });
    };
  };



    render(){
      //const {name, description, amount, category, type } = this.state 
      //Unused variables that were previously used to set name={name} of inputs. This was throwing a strange "uncontrolled input/requires defaultValues" error that we haven't fully figured out yet, so I'm leaving them here until then.
      const { type, name , category, description, amount} = this.state; 
       //For now this is all we need
       const optionForType = 
        type === 'income'
        ?
        ['paycheck', 'freelance', 'side_gig', 'other']
        :
        ['bills', 'transportation', 'food', 'entertainment', 'other']
        ;

        return(
          <div className='transaction_form_wrapper'>
            <form
              className='transaction_form' 
              onChange={e => this.handleChange(e)}
              onSubmit={e => this.props.handleSubmit(e, this.state)}
              
            >
              <div className='transaction_notes'>
                {
                  !this.props.editing 
                  && 
                  <>
                    <label htmlFor='transactionType'></label>
                    <select
                      onChange={e => this.handleChange(e)}
                      name='type'
                      className='transaction_selector transaction__form_type'
                      required>
                        <option value=''>select</option>
                      {this.renderOptions(['income','expenses'])}
                    </select> 
                  </>
                }
                <input 
                  name='name'
                  maxLength='50' //lol get dunked in 
                  placeholder='name'
                  defaultValue={name}
                  required
                  className='transaction_input name_input'/>
                <select 
                  onChange={e => this.handleChange(e)}
                  name='category'
                  value={category}
                  className='transaction_selector transaction__form_category'
                  required>
                    <option value=''>select</option>
                    {this.renderOptions(optionForType)}
                </select>
                <textarea
                  name='description'
                  maxLength='500'
                  placeholder='description'
                  defaultValue={description}
                  className='transaction_input description_input'/>
              </div>
              <div className='amount_wrapper'>
                <input
                  name='amount'
                  type='number'
                  min='-9999999999'
                  max='9999999999'
                  className='transaction_input amount_input'
                  placeholder='amount'
                  defaultValue={amount}
                  step={0.01} precision={2}
                  required/>
              </div>
                <div className='button_wrapper'>
                  <button
                  type='submit' 
                  className='transaction_submit btn secondaryBtnALT'>
                    Submit
                  </button>

                  <button
                  onClick={this.props.handleCancel} 
                  className='transaction_form_cancel red_button btn secondaryBtnALT'>
                    Cancel
                  </button>
                </div>
            </form>
          </div>
        );
    };
};
