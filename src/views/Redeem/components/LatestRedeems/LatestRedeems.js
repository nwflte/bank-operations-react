import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'utils/axios';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardHeader,
  CardContent,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import mockData from './data';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 800
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  status: {
    marginRight: theme.spacing(1)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const statusColors = {
  approved: 'success',
  request: 'info',
  refunded: 'danger'
};

function handleApprove(pledge) {
  const request = axios.post('api/obligations/redeems/approve', {
    externalId: pledge.externalId
  });
}

const LatestRedeems = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  //const [orders] = useState(mockData);
  const redeems = props.redeems.data ? props.redeems.data : mockData;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            component={Link}
            size="small"
            to="add"
            variant="outlined"
          >
            New redeem
          </Button>
        }
        title="Latest Redeems"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Redeem Ref</TableCell>
                  <TableCell>Value</TableCell>
                  <TableCell sortDirection="desc">
                    <Tooltip
                      enterDelay={300}
                      title="Sort"
                    >
                      <TableSortLabel
                        active
                        direction="desc"
                      >
                        Date
                      </TableSortLabel>
                    </Tooltip>
                  </TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {redeems.map(redeem => (
                  <TableRow
                    hover
                    key={redeem.linearId}
                  >
                    <TableCell>{redeem.externalId}</TableCell>
                    <TableCell>{redeem.amount}</TableCell>
                    <TableCell>
                      {moment(redeem.requesterDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[redeem.status.toLowerCase()]}
                          size="sm"
                        />
                        {redeem.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      {redeem.status === 'REQUEST' && (
                        <Button
                          color="secondary"
                          //href="/pledge/add"
                          onClick={() => handleApprove(redeem)}
                          size="small"
                          variant="contained"
                        >
                          APPROVE
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          size="small"
          variant="text"
        >
          View all <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

LatestRedeems.propTypes = {
  className: PropTypes.string
};

export default LatestRedeems;
