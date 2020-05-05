import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, Results } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  }
}));

const ClientManagementList = () => {
  const classes = useStyles();

  const [clients, setClients] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchClients = () => {
      axios.get('api/utilisateurs').then(response => {
        if (mounted) {
          setClients(response.data);
        }
      });
    };

    fetchClients();

    return () => {
      mounted = false;
    };
  }, []);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page
      className={classes.root}
      title="Customer Management List"
    >
      <Header />
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      {clients && <Results
        className={classes.results}
        clients={clients}
                  />}
    </Page>
  );
};

export default ClientManagementList;
