import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import { Grid, Divider } from '@material-ui/core';

import axios from 'utils/axios';
import { Page, SearchBar } from 'components';
import { Header, NodeCard, Overview, Flows } from './components';

import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  paginate: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center'
  }
}));

const getAllNodes = async () => {
  const { data } = await axios.get('api/node/network-map');
  return data;
};

const NodesList = () => {
  const classes = useStyles();

  const queryInfo = useQuery('peers', getAllNodes);

  const handleFilter = () => {};
  const handleSearch = () => {};

  return (
    <Page
      className={classes.root}
      title="Node Info"
    >
      <Header />
      <Grid
        item
        xs={12}
      >
        <Overview />
      </Grid>

      <Divider />

      <Typography
        component="h1"
        variant="h3"
      >
        Network Peers
      </Typography>
      <SearchBar
        onFilter={handleFilter}
        onSearch={handleSearch}
      />
      <div className={classes.results}>
        {queryInfo.data &&
          queryInfo.data.map(node => (
            <NodeCard
              key={node.serial}
              project={node}
            />
          ))}
      </div>

      <Divider />

      <Typography
        component="h1"
        variant="h3"
      >
        Flows
      </Typography>

      <Flows />
    </Page>
  );
};

export default NodesList;
