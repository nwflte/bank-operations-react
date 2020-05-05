import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import axios from 'utils/axios';
import { ClientInfo, CompteInfo, OtherActions } from './components';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Summary = props => {
  const { clientId, className, ...rest } = props;

  const classes = useStyles();
  const [client, setClient] = useState();

  useEffect(() => {
    let mounted = true;

    const fetchClient = () => {
      axios.get(`/api/utilisateurs/${clientId}`).then(response => {
        if (mounted) {
          setClient(response.data);
        }
      });
    };

    fetchClient();

    return () => {
      mounted = false;
    };
  }, []);

  if (!client) {
    return null;
  }

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <ClientInfo client={client} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <CompteInfo client={client} />
      </Grid>
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <OtherActions />
      </Grid>
    </Grid>
  );
};

Summary.propTypes = {
  className: PropTypes.string
};

export default Summary;
