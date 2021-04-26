import React, { Fragment, Component, useState, useEffect } from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeviceInfo from './DeviceInfo';
import Analytic from './Analytic';
import OnlineCount from './OnlineCount';
import OfflineCount from './OfflineCount';
import TotalCount from './TotalCount';
import StatusAnalytic from './StatusAnalytic';
import { Container, Col, Row } from 'react-bootstrap';
import './Homepage.css';

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
      <Container fluid="md" className="mt-5">
        <Row className="justify-content-md-center mb-4" >
          <Col lg={5} className='mb-3 mb-md-0'><StatusAnalytic /></Col>
          <Col lg={7} ><Analytic /></Col>
        </Row>
        <Row className='justify-content-md-center mt-5 mb-5'>
          <Col md={3} className='mb-3 mb-md-0'><TotalCount /></Col>
          <Col md={3} className='mb-3 mb-md-0'><OnlineCount /></Col>
          <Col md={3} className='mb-3 mb-md-0'><OfflineCount /></Col>
        </Row>
        <Row>
          <Col><DeviceInfo /></Col>
        </Row>

      </Container>
    </Fragment>

  )
}



export default Homepage;