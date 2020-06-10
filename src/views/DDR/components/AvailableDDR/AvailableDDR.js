import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import gradients from 'utils/gradients';
import { useQuery } from 'react-query';
import axios from 'utils/axios';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundImage: gradients.green,
    height: 48,
    width: 48
  }
}));

const getBalance = async () => {
  const { data } = await axios.get('api/ddrs/balance');
  return data;
};

const AvailableDDR = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const queryInfo = useQuery('balance', getBalance, { refetchInterval: 1000 });

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div>
        <Typography component="h3" gutterBottom variant="overline">
          Available
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            MAD {queryInfo.data ? queryInfo.data / 100 : 0}
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <AttachMoneyIcon />
      </Avatar>
    </Card>
  );
};

AvailableDDR.propTypes = {
  className: PropTypes.string
};

export default AvailableDDR;
