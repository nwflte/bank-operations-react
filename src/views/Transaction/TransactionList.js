import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  TransactionsToolbar,
  TransactionsTable,
  TransactionAdd
} from './components';
import mockData from './data';

import axios from 'utils/axios';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const getVirements = async () => {
  const { data } = await axios.get('api/virements');
  return data;
};

const TransactionList = () => {
  const classes = useStyles();

  const [openAddTransaction, setOpenAddTransaction] = React.useState(false);

  const handleAddTransactionOpen = () => {
    setOpenAddTransaction(true);
  };
  const handleAddTransactionClose = () => {
    setOpenAddTransaction(false);
  };

  const [virements] = useState(mockData);
  const queryInfo = useQuery('virements', getVirements);

  console.log('data', queryInfo);
  //const data = queryInfo.data ? queryInfo.data : virements;
  return (
    <div className={classes.root}>
      <TransactionsToolbar
        handleAddTransactionOpen={handleAddTransactionOpen}
      />
      <div className={classes.content}>
        <TransactionsTable virements={queryInfo.data || virements} />
      </div>
      <TransactionAdd
        onClose={handleAddTransactionClose}
        open={openAddTransaction}
      />
    </div>
  );
};

export default TransactionList;
