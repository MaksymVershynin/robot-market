import React from "react"
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import "../App.css"
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Robots from './Robots'
import Filter from './Filter'
import Cart from '../components/atoms/Cart'


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
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
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: 224,
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
  }));


const Content = ({ allRobots, materialTypes}) => {
    const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return <div className={classes.root}>
            
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <h1>Robot <br/>Market</h1>
                <Tab label="All Robots" {...a11yProps(0)} />
                <Tab label="My Cart" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
            <Alert severity="info">
              Hello to the ROBOT-MARKET. Please click "All robots" tab on left siderab to observe all robots in the market.<br/>
              "My Cart" tab are shown you all selected robots</Alert>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div className={"page_separator"}>
                  <div className={"robots_content"}>
                      <Filter 
                          allRobots = {allRobots}
                          materialTypes={materialTypes}
                      />
                      <Robots />
                  </div>
                  <div className={"desktopCart"}>
                      <Cart />
                  </div>
              </div>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Cart />
            </TabPanel>
    
        </div>
}

export default Content;