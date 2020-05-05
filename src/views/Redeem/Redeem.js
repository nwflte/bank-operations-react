import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestRedeems
} from './components';

import axios from 'utils/axios';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const getRedeems = async () => {
  const { data } = await axios.get('api/obligations/redeems');
  return data;
};

const Redeem = () => {
  const classes = useStyles();
  const queryInfo = useQuery('redeems', getRedeems);

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>

        <Grid
          item
          lg={10}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestRedeems redeems={queryInfo} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Redeem;
