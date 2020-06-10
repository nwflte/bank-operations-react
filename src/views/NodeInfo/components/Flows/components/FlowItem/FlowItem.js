import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
  colors
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const useStyles = makeStyles(theme => ({
  root: {},
  critical: {
    '& $indicator': {
      borderColor: colors.red[600]
    }
  },
  indicator: {
    height: 12,
    width: 12,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: colors.grey[100],
    borderRadius: '50%'
  },
  viewButton: {
    marginLeft: theme.spacing(2)
  }
}));

const FlowItem = props => {
  const { flow, className, ...rest } = props;

  const classes = useStyles();

  return (
    <ListItem
      {...rest}
      className={clsx(classes.root, className)}
    >
      <ListItemIcon>
        <span className={classes.indicator} />
      </ListItemIcon>
      <ListItemText
        className={classes.listItemText}
        primary={flow}
        primaryTypographyProps={{ variant: 'h6', noWrap: true }}
      />
      <Tooltip title="View task">
        <IconButton
          className={classes.viewButton}
          edge="end"
          size="small"
        >
          <OpenInNewIcon />
        </IconButton>
      </Tooltip>
    </ListItem>
  );
};

FlowItem.propTypes = {
  className: PropTypes.string,
  flow: PropTypes.string.isRequired
};

export default FlowItem;
