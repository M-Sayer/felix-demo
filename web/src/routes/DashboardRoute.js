import React, { useContext } from 'react';
import UserOverview from '../components/Overview/UserOverview';
import GoalsOverview from '../components/Overview/GoalsOverview';
import TransactionsOverview from '../components/Overview/TransactionsOverview';
import Alerts from '../components/Alerts/Alerts';
import AlertsContext from '../contexts/AlertsContext';

const DashboardRoute = (props) => {
  const alertsContext = useContext(AlertsContext);

  return (
    <>
    {alertsContext.dashboardAlerts.length > 0 &&  
      <section className='AlertsOverview'>       
        <section className='Alerts'>
          <Alerts />
        </section>
      </section>
    }
  
      <section
        className='UserOverview'
      >
        <UserOverview />
      </section>

      <section
        className='GoalsOverview'
      >
        <GoalsOverview
          {...props}
        />
      </section>

      <section
        className='TransactionsOverview'
      >
        <TransactionsOverview
          {...props}
        />
      </section>
    </>
  );
}

export default DashboardRoute;