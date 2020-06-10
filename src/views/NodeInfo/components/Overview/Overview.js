import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Grid, colors } from '@material-ui/core';

import { Label } from 'components';
import { useQuery } from 'react-query';
import axios from 'utils/axios';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  item: {
    padding: theme.spacing(3),
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      '&:not(:last-of-type)': {
        borderRight: `1px solid ${theme.palette.divider}`
      }
    },
    [theme.breakpoints.down('sm')]: {
      '&:not(:last-of-type)': {
        borderBottom: `1px solid ${theme.palette.divider}`
      }
    }
  },
  valueContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    marginLeft: theme.spacing(1)
  }
}));

const fetchNodeInfo = async () => {
  const { data } = await axios.get('/api/node/me');
  return data;
};

const fetchNodeTime = async () => {
  const { data } = await axios.get('/api/node/node-time');
  return data;
};

const Overview = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const queryNodeInfo = useQuery('nodeInfo', fetchNodeInfo);
  const queryNodeTime = useQuery('nodeTime', fetchNodeTime);
  const data = {};

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Grid
        alignItems="center"
        container
        justify="space-between"
      >
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Legal Name
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">
              {queryNodeInfo.data &&
                queryNodeInfo.data.legalIdentitiesAndCerts[0]}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Node Time
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">
              {moment(queryNodeTime.data).toString()}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Address
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">
              {queryNodeInfo.data && queryNodeInfo.data.addresses[0]}
            </Typography>
          </div>
        </Grid>
        <Grid
          className={classes.item}
          item
          md={3}
          sm={6}
          xs={12}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="overline"
          >
            Platform Version
          </Typography>
          <div className={classes.valueContainer}>
            <Typography variant="h3">
              {queryNodeInfo.data && queryNodeInfo.data.platformVersion}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Card>
  );
};

Overview.propTypes = {
  className: PropTypes.string
};

export default Overview;
