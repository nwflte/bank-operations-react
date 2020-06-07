import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  TotalRequested,
  TotalApproved,
  AcceptedPercentage,
  TotalProfit,
  LatestRedeems,
  RedeemAdd
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

  const [openAddRedeem, setOpenAddRedeem] = React.useState(false);

  const handleAddRedeemOpen = () => {
    setOpenAddRedeem(true);
  };
  const handleAddRedeemClose = () => {
    setOpenAddRedeem(false);
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
          <TotalRequested redeems={queryInfo.data} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalApproved redeems={queryInfo.data} />
        </Grid>
        <Grid
          item
          lg={3}
          sm={6}
          xl={3}
          xs={12}
        >
          <AcceptedPercentage redeems={queryInfo.data} />
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
          <LatestRedeems
            handleAddRedeemOpen={handleAddRedeemOpen}
            redeems={queryInfo.data}
          />
        </Grid>
      </Grid>
      <RedeemAdd
        onClose={handleAddRedeemClose}
        open={openAddRedeem}
      />
    </div>
  );
};

export default Redeem;
