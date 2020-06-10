import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  List,
  Button,
  Divider
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import axios from 'utils/axios';
import { GenericMoreButton } from 'components';
import { FlowItem } from './components';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 400
  },
  actions: {
    justifyContent: 'flex-end'
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const getFlows = async () => {
  const { data } = await axios.get('api/node/registered-flows');
  return data;
};

const Flows = props => {
  const { className, ...rest } = props;
  const classes = useStyles();

  const queryInfo = useQuery('flows', getFlows);

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Node Registered Flows"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <List>
              {queryInfo.data &&
                queryInfo.data.map((flow, i) => (
                  <FlowItem
                    divider={i < queryInfo.data.length - 1}
                    flow={flow}
                    key={flow}
                  />
                ))}
            </List>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
    </Card>
  );
};

Flows.propTypes = {
  className: PropTypes.string
};

export default Flows;
