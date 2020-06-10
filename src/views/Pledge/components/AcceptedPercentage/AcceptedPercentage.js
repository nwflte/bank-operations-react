import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  LinearProgress
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  progress: {
    marginTop: theme.spacing(3)
  }
}));

const AcceptedPercentage = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const pledges = props.pledges;
  const percentage =
    (pledges &&
      (pledges.filter(
        pledge => pledge.type === 'PLEDGE' && pledge.status === 'APPROVED'
      ).length *
        100) /
        pledges.length) ||
    0;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2">
              APPROVED PERCENTAGE
            </Typography>
            <Typography variant="h3">{`${percentage &&
              percentage.toFixed(2)} %`}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <InsertChartIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <LinearProgress
          className={classes.progress}
          value={75.5}
          variant="determinate"
        />
      </CardContent>
    </Card>
  );
};

AcceptedPercentage.propTypes = {
  className: PropTypes.string
};

export default AcceptedPercentage;
