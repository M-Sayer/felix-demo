import React from 'react';
import CreateTransaction from '../components/CreateTransaction/CreateTransaction';

export default class CreateTransactionRoute extends React.Component {

  render() {
    return (
      <>
        <section>
          <CreateTransaction history={this.props.history} />
        </section>
      </>
    );
  };
};
