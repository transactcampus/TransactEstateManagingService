import React, { Fragment, Component, useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeviceInfo from './DeviceInfo';
import Chart from './Chart';
import PropTypes from 'prop-types';
import { fetchCategory } from '../actions'
import { connect } from 'react-redux';
import Analytic from './Analytic';

const Homepage = () => {


  const classes = useStyles();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  return (
    <Fragment>
      <Analytic />
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