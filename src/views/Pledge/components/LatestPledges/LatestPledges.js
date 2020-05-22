import React from 'react';
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
import { StatusBullet } from 'components';
import { useAuth } from 'authentication-context';

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
  const request = axios.post('api/obligations/pledges/approve', {
    externalId: pledge.externalId
  });
}

function handleReject(pledge) {
  const request = axios.post('api/obligations/pledges/deny', {
    externalId: pledge.externalId
  });
}

function handleCancel(pledge) {
  const request = axios.post('api/obligations/pledges/cancel', {
    externalId: pledge.externalId
  });
}

const LatestPledges = props => {
  const { className, handleAddPledgeOpen, ...rest } = props;

  const classes = useStyles();
  const [userInfo] = useAuth();

  const isBankRole = userInfo.roles.includes('ROLE_BANK');

  const pledges = props.pledges;

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={
          <Button
            color="primary"
            onClick={handleAddPledgeOpen}
            size="small"
            variant="outlined"
          >
            New pledge
          </Button>
        }
        title="Latest Pledges"
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Pledge Ref</TableCell>
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
                {pledges.map(pledge => (
                  <TableRow
                    hover
                    key={pledge.linearId}
                  >
                    <TableCell>{pledge.externalId}</TableCell>
                    <TableCell>{pledge.amount}</TableCell>
                    <TableCell>
                      {moment(pledge.requesterDate).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <div className={classes.statusContainer}>
                        <StatusBullet
                          className={classes.status}
                          color={statusColors[pledge.status.toLowerCase()]}
                          size="sm"
                        />
                        {pledge.status}
                      </div>
                    </TableCell>
                    <TableCell>
                      {pledge.status === 'REQUEST' && !isBankRole && (
                        <div>
                          <Button
                            color="secondary"
                            //href="/pledge/add"
                            onClick={() => handleApprove(pledge)}
                            size="small"
                            variant="contained"
                          >
                            APPROVE
                          </Button>
                          <Button
                            color="secondary"
                            onClick={() => handleReject(pledge)}
                            size="small"
                            variant="contained"
                          >
                            REJECT
                          </Button>
                        </div>
                      )}
                      {pledge.status === 'REQUEST' && isBankRole && (
                        <Button
                          color="secondary"
                          onClick={() => handleCancel(pledge)}
                          size="small"
                          variant="contained"
                        >
                          CANCEL
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

LatestPledges.propTypes = {
  className: PropTypes.string
};

export default LatestPledges;
