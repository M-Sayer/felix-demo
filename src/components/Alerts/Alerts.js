import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AlertsContext from '../../contexts/AlertsContext';
import { updateAlert } from '../../services/alertsService';
import moment from 'moment-timezone';

import './Alerts.css';

const Alerts = () => {
  const alertsContext = useContext(AlertsContext);
  
  // object where each key is an alert id
  // value is true or false where true is expanded
  const [expanded, setExpanded] = useState({})
  
  const toggleExpand = id => {
    setExpanded({ [id]: !expanded[id] })
  }

  const markRead = async id => {
    await updateAlert(id, {read: true});
    alertsContext.setState({}); //force rerender
  }

  const location = useLocation().pathname;

  const renderAlerts = () => {
    let alerts;
    if (location === '/') alerts = alertsContext.dashboardAlerts.slice(0, 3);
    if (location === '/alerts') alerts = alertsContext.allAlerts;

    return alerts.map(alert => (
      <div  
        className='alertSection overviewSection' 
        key={alert.id}
      >
        <section className='alertTitle dataFlexRow'>
          <p className='userData3'>
            {alert.title}
          </p>
          <p className='userData3'>
            {moment(alert.date_created).format('MMM Do, YYYY')}
          </p>
        </section>
        <div className='btnsFlexRowALT'>
          {expanded[alert.id] 
            ?
              <div className='alertFlex'>
                <p className='userData3 alertMessage'>
                  {alert.message}
                </p> 
                <button 
                  onClick={() => toggleExpand(alert.id)}
                  className='btn tertiaryBtnALT'
                >
                  read less
                </button>
              </div>
            : <button 
                onClick={() => toggleExpand(alert.id)}
                className='btn tertiaryBtnALT sticky'
              >
                read more
              </button>
          }
          {!alert.read && 
            <button 
              onClick={() => markRead(alert.id)}
              className='btn tertiaryBtnALT sticky'
            > 
              mark as read
            </button>}
        </div>
      </div>
    ))
  };

  return (
    <div className='alertPage'>
      <h1 className='sectionHeaderALT'>
        Alerts
      </h1>
      {renderAlerts()}
    </div>
  )
}

export default Alerts;