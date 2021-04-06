import React, { Fragment, Component, useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeviceInfo from './DeviceInfo';
import Chart from './Chart';
import PropTypes from 'prop-types';
import { fetchCategory } from '../actions'
import { connect } from 'react-redux';
import Analytic from './Analytic';
import OnlineCount from './OnlineCount';
import OfflineCount from './OfflineCount';
import TotalCount from './TotalCount';

const useStyles1 = makeStyles((theme) => ({
  box: {
    height: '130px',
    width: '100%',

  },
  mainBox: {
    marginTop: 5
  }
}));

const Homepage = () => {
  const classes = useStyles();
  const c = useStyles1();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={6} >
          <Grid item item xs={6} md={5} lg={4} >
            <Box my={4} r={5}>
              <Paper className={c.box} elevation={10}>
                <TotalCount />
              </Paper>
            </Box>
          </Grid>
          <Grid item item xs={6} md={5} lg={4} >
            <Box my={4}>
              <Paper className={c.box} elevation={10}>
                <OnlineCount />
              </Paper>
            </Box>
          </Grid>
          <Grid item item xs={6} md={5} lg={4} >
            <Box my={4}>
              <Paper className={c.box} elevation={10}>
                <OfflineCount />
              </Paper>
            </Box>
          </Grid>
        </Grid>


      </Container>

      <Container maxWidth="lg" className={classes.container}>


        <Grid item xs={12} >
          <Analytic />
        </Grid>




      </Container>


      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>

          <Grid item xs={12} md={8} lg={9}>
            <DeviceInfo />
          </Grid>


        </Grid>

      </Container>





    </Fragment>

  )
}



export default Homepage;