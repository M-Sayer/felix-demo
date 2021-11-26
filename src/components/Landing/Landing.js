import React from 'react';
import TokenService from '../../services/token-service';
import './Landing.css';

const Landing = (props) => {
  const renderAccountProcess = () => {
    return (
      <>
        <h2
          className=' sectionHeaderALT'
        >
          Meet Felix, your personal finance assistant.
        </h2>

        <p>
          This app aims to help you keep track of your finances by aggregating financial transactions in one place and by helping you achieve your savings goals.
        </p>
        <p>
          To get started, you may login or sign up for an account:
        </p>
        <ul
          className=''
        >
          <li
            className='landingList'
          >
            Username must be unique and may include uppercase letters, lowercase letters, numbers, special characters limited to dashes and underscores
          </li>
          <li
            className='landingList'
          >
            Password must be at least 8 characters
          </li>
          <li
            className='landingList'
          >
            Password must include 1 uppercase, 1 lowercase, 1 numeric, and 1 special character
          </li>
        </ul>
      </>
    )
  }

  return (
    <article
      className='landingContainer'
    >
      {TokenService.hasAuthToken()
        ? <h2
            className=' sectionHeaderALT'
          >
            Need help?
          </h2>
        : renderAccountProcess()
      }
      <h3
        className='sectionSubHeader'
      >
        How it works:
      </h3>
      <p>
        Beginning with zero balance, you may record your income (+ transactions) and expenses (-transactions). The app will automatically calculate your balance at any given time based on your recorded transactions.
      </p>
      <p>
        The app will also calculate your allowance, which is the money you have available to spend after allocating to your goals from balance.
      </p>
      <p>
        Goals are sub-accounts that represent a purpose that a user may save up for. For every goal, you may specify a name, amount, and target completion date.
      </p>
      <p>
        Upon input of the above information, the app will calculate in real time your weekly contribution amount. The contribution amount is the fractional amount to be allocated to your goal on a specified interval (currently, only weekly). If you are satisfied with the setup, you may submit this information and let the app take care of the rest.
      </p>
      <p>
        Every Sunday at 00:00 UTC, your funds are automatically moved from allowance to goals. On target goal completion date, you will be alerted of success!
      </p>
    </article>
  );
}

export default Landing;