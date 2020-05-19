import React from 'react';
import { makeStyles } from '@material-ui/styles';

import axios from 'utils/axios';
import { useQuery } from 'react-query';
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

const getClients = async () => {
  const { data } = await axios.get('api/clients');
  return data;
};

const ClientManagementList = () => {
  const classes = useStyles();

  const queryInfo = useQuery('clients', getClients);

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
      {queryInfo.data && (
        <Results
          className={classes.results}
          clients={queryInfo.data}
        />
      )}
    </Page>
  );
};

export default ClientManagementList;
