import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { 
  AppBar,
  Tabs,
  Tab,
  Box,
  useTheme,
  makeStyles,
  Container,
  Typography,
  Paper,
  Fab,
  Zoom,
} from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';
import DonutLarge from '@material-ui/icons/DonutLarge';
import AttachMoney from '@material-ui/icons/AttachMoney'
import MoneyOff from '@material-ui/icons/MoneyOff'
import Notifications from '@material-ui/icons/Notifications'
import Settings from '@material-ui/icons/Settings'

import { Overview } from './Overview';
import Alerts from './Alerts/Alerts';
import { GoalsContext } from '../contexts/GoalsContext';
import { GoalForm } from './GoalForm';
import { TransactionsContext } from '../contexts/TransactionsContext';
import { TransactionForm } from './TransactionForm'
import { FinancialList } from './Accordion'
import { SettingsTab } from './SettingsTab'
import { GoalLabels } from './UI/Labels'

const TabPanel = ({ children, tabIndex, index, ...other }) => (
    <div
      role="tabpanel"
      hidden={tabIndex !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {tabIndex === index && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  )

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  tabIndex: PropTypes.any.isRequired,
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
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabGoal: {
    backgroundColor: theme.palette.tertiary.main
  }
}));

export const TabBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [tabIndex, setTabIndex] = React.useState(0)
  const GoalsCtx = useContext(GoalsContext);
  const TransactionsCtx = useContext(TransactionsContext);

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  // call to action buttons (add button)
  const fabs = [
    // {
    //   className: `${classes.fab} ${classes.fabGoal}`,
    //   name: 'goal',
    // },
    {
      color: 'secondary',
      className: classes.fab,
      name: 'transaction',
    }
  ]

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={tabIndex}
          onChange={(e, idx) => setTabIndex(idx)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="nav tabs"
        >
          <Tab className={classes.tab} icon={<DonutLarge />} label={ tabIndex === 0 ? 'Overview' : '' } {...a11yProps(0)} />
          {/* <Tab className={classes.tab} icon={<AttachMoney />} label={ tabIndex === 1 ? 'Goals' : '' } {...a11yProps(1)} /> */}
          <Tab className={classes.tab} icon={<MoneyOff />} label={ tabIndex === 1 ? 'Transactions' : '' } {...a11yProps(2)} />
          {/* <Tab className={classes.tab} icon={<Notifications />} label={ tabIndex === 3 ? 'Alerts' : '' } {...a11yProps(3)} /> */}
          <Tab className={classes.tab} icon={<Settings />} label={ tabIndex === 2 ? 'Settings' : '' } {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={setTabIndex}
      >
        <TabPanel tabIndex={tabIndex} index={0} dir={theme.direction}>
          <Overview setTabIndex={setTabIndex} />
        </TabPanel>
        {/* <TabPanel tabIndex={tabIndex} index={1} dir={theme.direction}>
          <Container>
            {GoalsCtx.editGoal || GoalsCtx.createGoal
              ? <GoalForm />
              : <>
                  <Box color='tertiary.main'>
                    <Typography variant='h3'>Goals</Typography>
                  </Box>
                  <FinancialList list={GoalsCtx.goals} type='goal' context={GoalsCtx}/>
               </>
            }
          </Container>
        </TabPanel> */}
        <TabPanel tabIndex={tabIndex} index={1} dir={theme.direction}>
          <Container>
            {TransactionsCtx.createTransaction || TransactionsCtx.editTransaction
              ? <TransactionForm />
              : <>
                  <Box color='secondary.main'>
                    <Typography variant='h3'>Transactions</Typography>
                  </Box>
                  <FinancialList list={TransactionsCtx.transactions} type='transaction' context={TransactionsCtx} />
                </>
            }
          </Container>
        </TabPanel>
        {/* <TabPanel tabIndex={tabIndex} index={3} dir={theme.direction}>
          Alerts
          <Alerts />
        </TabPanel> */}
        <TabPanel tabIndex={tabIndex} index={2} dir={theme.direction}>
          <SettingsTab />
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={index}
          in={tabIndex === index + 1}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${tabIndex === index + 1 ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab 
            onClick={() => {
              if (fab.name === 'goal') GoalsCtx.setCreateGoal(true)

              if (fab.name == 'transaction') TransactionsCtx.setCreateTransaction(true)
            }} 
            aria-label='Add' className={fab.className} 
            color={fab.color}
            >
            <AddIcon />
          </Fab>
        </Zoom>
      ))}
    </div>
  );
}
