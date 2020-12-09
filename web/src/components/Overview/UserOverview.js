import React, { Component } from 'react';
import UserContext from '../../contexts/UserContext';
import UserService from '../../services/user-service';
import './Overview.css';

class UserOverview extends Component {
  static contextType = UserContext;

  async componentDidMount() {
    try {
      const user = await UserService.getUser();
      this.context.setUser(user);
    }
    catch({ error }) {
      this.context.setError(error);
    }
  }

  render() {
    const { user = {} } = this.context;

    return (
      <article 
        className='overviewSection'
      >
        <h2
          className='sectionHeader'
        >
          Overview
        </h2>
        <p className='sectionSubHeader'>
          Balance
        </p>
        <div className='userData'>
          {user.balance}
        </div>
        
        <p className='sectionSubHeader'>
          Allowance
        </p>
        <div className='userData'>
          {user.allowance}
        </div>
      </article>
    );
  }
}

export default UserOverview;