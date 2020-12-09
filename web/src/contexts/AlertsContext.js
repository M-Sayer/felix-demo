import React, { useState, useEffect } from 'react';
import { getAlerts } from '../services/alertsService';
import moment from 'moment';
import TokenService from '../services/token-service';

const AlertsContext = React.createContext({
  allAlerts: [],
  setAllAlerts: () => {},
  dashboardAlerts: [],
  setDashboardAlerts: () => {},
  setState: () => {},
});

export default AlertsContext;

export const AlertsProvider = props => {
  const [state, setState] = useState(); // this is only used to rerender
  const [allAlerts, setAllAlerts] = useState([]);
  const [dashboardAlerts, setDashboardAlerts] = useState([])

  // sort alerts by most recent
  const sortAlerts = alerts => {
    alerts.sort((a, b) => {
      if (moment(a).isBefore(b)) return 1;
      
      return -1
    });
  }
  
  const fetchData = async () => {
    const alerts = await getAlerts();
    sortAlerts(alerts);
    setAllAlerts(alerts);
  };
  
  useEffect(() => {TokenService.hasAuthToken() && fetchData()}, [state]);

  useEffect(() => {
    setDashboardAlerts(allAlerts.filter(alert =>
      alert.read === false))
  }, [allAlerts])

  return (
    <AlertsContext.Provider 
      value={{
        allAlerts: allAlerts, 
        setAllAlerts: setAllAlerts,
        dashboardAlerts: dashboardAlerts,
        setDashboardAlerts: setDashboardAlerts,
        setState: setState,
      }}
    >
      {props.children}
    </AlertsContext.Provider>
  );
};
