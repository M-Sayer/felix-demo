import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import DonutLarge from '@material-ui/icons/DonutLarge';
import AttachMoney from '@material-ui/icons/AttachMoney'
import MoneyOff from '@material-ui/icons/MoneyOff'
import Notifications from '@material-ui/icons/Notifications'
import Settings from '@material-ui/icons/Settings'

import { Overview } from './Overview';
import { useHistory } from 'react-router-dom';
import Goals from './Goals/Goals';
import Alerts from './Alerts/Alerts';
import Transactions from './Transactions/Transactions';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  tab: {
    fontSize: '8px',
  }
}));

export const TabBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const history = useHistory();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="nav tabs"
        >
          <Tab className={classes.tab} icon={<DonutLarge />} label={ value === 0 ? 'Overview' : '' } {...a11yProps(0)} />
          <Tab className={classes.tab} icon={<AttachMoney />} label={ value === 1 ? 'Goals' : '' } {...a11yProps(1)} />
          <Tab className={classes.tab} icon={<MoneyOff />} label={ value === 2 ? 'Transactions' : '' } {...a11yProps(2)} />
          <Tab className={classes.tab} icon={<Notifications />} label={ value === 3 ? 'Alerts' : '' } {...a11yProps(3)} />
          <Tab className={classes.tab} icon={<Settings />} label={ value === 4 ? 'Settings' : '' } {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Overview />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Goals
          <Goals props={history} />
        <AttachMoney />
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Transactions
          <Transactions />
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          Alerts
          <Alerts />
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          Settings
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
