import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Page } from 'components';
import {
  Header,
  NumberDDR,
  RealTime,
  RoiPerCustomer,
  AvailableDDR,
  MoyenneDDR,
  PerformanceOverTime
} from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  container: {
    marginTop: theme.spacing(3)
  }
}));

const DDR = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Default Dashboard"
    >
      <Header />
      <Grid
        className={classes.container}
        container
        spacing={3}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <AvailableDDR />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <NumberDDR />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <MoyenneDDR />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xs={12}
        >
          <RoiPerCustomer />
        </Grid>
        <Grid
          item
          lg={3}
          xs={12}
        >
          <RealTime />
        </Grid>
        <Grid
          item
          lg={9}
          xs={12}
        >
          <PerformanceOverTime />
        </Grid>
      </Grid>
    </Page>
  );
};

export default DDR;
