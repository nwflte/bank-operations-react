import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, LinearProgress } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

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
  content: {
    flexGrow: 1
  },
  details: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  progress: {
    margin: theme.spacing(0, 1),
    flexGrow: 1
  },
  avatar: {
    backgroundImage: gradients.orange,
    height: 48,
    width: 48
  }
}));

const getAverage = async () => {
  const { data } = await axios.get('api/ddrs/average');
  return data;
};

const MoyenneDDR = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const queryInfo = useQuery('averageDDR', getAverage);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div className={classes.content}>
        <Typography component="h3" gutterBottom variant="overline">
          Average Value
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">
            {(queryInfo.data && (queryInfo.data / 100).toFixed(2)) || 0} MAD
          </Typography>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <DoneIcon />
      </Avatar>
    </Card>
  );
};

MoyenneDDR.propTypes = {
  className: PropTypes.string
};

export default MoyenneDDR;
