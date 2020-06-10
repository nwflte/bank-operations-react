import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, Typography, Avatar, colors } from '@material-ui/core';
import FolderOpenIcon from '@material-ui/icons/FolderOpenOutlined';

import { Label } from 'components';
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
    backgroundImage: gradients.blue,
    height: 48,
    width: 48
  }
}));

const getCount = async () => {
  const { data } = await axios.get('api/ddrs/count');
  return data;
};

const NumberDDR = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const queryInfo = useQuery('numberDDR', getCount);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <div>
        <Typography component="h3" gutterBottom variant="overline">
          DDR Number
        </Typography>
        <div className={classes.details}>
          <Typography variant="h3">{queryInfo.data || 0}</Typography>
          <Label
            className={classes.label}
            color={colors.red[600]}
            variant="outlined">
            DDR
          </Label>
        </div>
      </div>
      <Avatar className={classes.avatar}>
        <FolderOpenIcon />
      </Avatar>
    </Card>
  );
};

NumberDDR.propTypes = {
  className: PropTypes.string
};

export default NumberDDR;
