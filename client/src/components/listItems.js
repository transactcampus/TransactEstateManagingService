import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import {Link} from 'react-router-dom';
import login from './Login';
import setTabs from './NewDashboard';

export const mainListItems = (
  <div>
    <ListItem button onClick={e=>setTabs("home")} >
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button onClick={e=>setTabs("home")}>
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText primary="About Us" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ContactPhoneIcon/>
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
    </ListItem>
  </div>
);