import React, { useEffect } from 'react';
import clsx from 'clsx';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useStyles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import { connect } from 'react-redux';
import Aboutus from './Aboutus';
import Homepage from './Homepage';
import TableInfo from './TableInfo';
import Maps from './Maps';
import Box from '@material-ui/core/Box';

function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [tabs, setTabs] = React.useState('home');

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const loadTabs = () => {

    switch (tabs) {
      case 'home':
        return <Homepage />
      case 'aboutus':
        return <Maps />
      default:
        break;
    }
  }

  const renderContent = () => {

    switch (props.auth) {
      case null:
        return <a href="/api/auth">Login with Azure</a>;
      default:
        return <a href="/#"><span className="white-text text-darken-2">Admin: {props.auth.given_name} </span></a>
    }
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          {renderContent()}
          <Box paddingLeft={5}><a href="/api/auth/logout"><span className="white-text text-darken-2">Logout</span></a></Box>
        </Toolbar>

      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem button onClick={e => setTabs("home")} >
              <ListItemIcon className={classes.icon}>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText disableTypography primary={<Typography style={{ color: '#000000' }}>Dashboard</Typography>} />
            </ListItem>
            <ListItem button onClick={e => setTabs("aboutus")}>
              <ListItemIcon className={classes.icon}>
                <InfoIcon />
              </ListItemIcon>
              <ListItemText primary="Device Locations" />
            </ListItem>
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <ContactPhoneIcon />
              </ListItemIcon>
              <ListItemText primary="Contact Us" />
            </ListItem>
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {loadTabs()}
      </main>
    </div>
  );
}
function mapStateToProps(state) {
  return { auth: state.auth };
}
export default connect(mapStateToProps)(Dashboard);