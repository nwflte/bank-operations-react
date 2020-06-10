import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Link,
  Typography,
  colors
} from '@material-ui/core';

import getInitials from 'utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(2)
  },
  content: {
    padding: theme.spacing(2),
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      flexWrap: 'wrap'
    },
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  header: {
    maxWidth: '100%',
    width: 240,
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2),
      flexBasis: '100%'
    }
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  stats: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  },
  actions: {
    padding: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      flexBasis: '50%'
    }
  }
}));

const NodeCard = props => {
  const { project, className, ...rest } = props;

  const classes = useStyles();

  const statusColors = {
    'In progress': colors.orange[600],
    Canceled: colors.grey[600],
    Completed: colors.green[600]
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <div className={classes.header}>
          <Avatar
            alt="Author"
            className={classes.avatar}
            src="/images/logos/corda.png"
          >
            {project.legalIdentitiesAndCerts[0]}
          </Avatar>
          <div>
            <Link
              color="textPrimary"
              component={RouterLink}
              noWrap
              to="#"
              variant="h5"
            >
              {project.legalIdentitiesAndCerts[0]}
            </Link>
          </div>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{project.platformVersion}</Typography>
          <Typography variant="body2">Platforme Version</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">{project.serial}</Typography>
          <Typography variant="body2">Serial</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {project.addresses[0].split(':')[0]}
          </Typography>
          <Typography variant="body2">Address</Typography>
        </div>
        <div className={classes.stats}>
          <Typography variant="h6">
            {project.addresses[0].split(':')[1]}
          </Typography>
          <Typography variant="body2">Port</Typography>
        </div>
      </CardContent>
    </Card>
  );
};

NodeCard.propTypes = {
  className: PropTypes.string,
  project: PropTypes.object.isRequired
};

export default NodeCard;
