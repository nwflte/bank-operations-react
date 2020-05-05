import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import axios from 'utils/axios';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  root: {}
}));

const addTransaction = data => {
  const request = axios.post('api/virements', {
    ...data,
    date: new Date()
  });
};

const TransactionForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = data => {
    console.log(data);
    addTransaction(data);
  };
  console.log(errors);

  const currencies = [
    {
      value: 'MAD',
      label: 'Moroccan Dirham'
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardHeader
          subheader=""
          title="New Transfer"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
                as={TextField}
                control={control}
                defaultValue=""
                fullWidth
                label="RIB de l'emetteur"
                margin="dense"
                name="ribEmetteur"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
                as={TextField}
                control={control}
                defaultValue=""
                fullWidth
                label="RIB du beneficiaire"
                margin="dense"
                name="ribBeneficiaire"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
                as={TextField}
                control={control}
                defaultValue=""
                fullWidth
                label="Motif"
                margin="dense"
                name="motif"
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Controller
                as={TextField}
                control={control}
                defaultValue=""
                fullWidth
                label="Amount"
                margin="dense"
                name="amount"
                type="number"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

TransactionForm.propTypes = {
  className: PropTypes.string
};

export default TransactionForm;
