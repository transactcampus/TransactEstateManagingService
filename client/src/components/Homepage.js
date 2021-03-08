import React from 'react';
import clsx from 'clsx';
import useStyles from './styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DeviceInfo from './DeviceInfo';

export default function Homepage() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(
        <Container maxWidth="lg" className={classes.container}>
            
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <DeviceInfo />
            </Grid>
            
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
        
              </Paper>
            </Grid>
          </Grid>
        </Container>
    )
}