import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import axios from 'utils/axios';

import {
  TotalRequested,
  TotalApproved,
  AcceptedPercentage,
  TotalProfit,
  LatestPledges,
  PledgeAdd
} from './components';

import { useQuery } from 'react-query';
import mockData from './data';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const getPledges = async () => {
  const { data } = await axios.get('api/obligations/pledges');
  return data;
};

const Pledge = () => {
  const classes = useStyles();
  const queryInfo = useQuery('pledge', getPledges);

  const [openAddPledge, setOpenAddPledge] = React.useState(false);

  const handleAddPledgeOpen = () => {
    setOpenAddPledge(true);
  };
  const handleAddPledgeClose = () => {
    setOpenAddPledge(false);
  };

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
          <TotalRequested pledges={queryInfo.data || mockData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalApproved pledges={queryInfo.data || mockData} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <AcceptedPercentage pledges={queryInfo.data || mockData} />
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
          <LatestPledges
            handleAddPledgeOpen={handleAddPledgeOpen}
            pledges={queryInfo.data || mockData}
          />
        </Grid>
      </Grid>
      <PledgeAdd
        onClose={handleAddPledgeClose}
        open={openAddPledge}
      />
    </div>
  );
};

export default Pledge;
