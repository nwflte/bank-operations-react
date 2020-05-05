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

const addRedeem = data => {
  const request = axios.post('api/obligations/redeems', {
    ...data
  });
};

const PledgeForm = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();
  const onSubmit = data => {
    console.log(data);
    addRedeem(data);
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
          title="New Redeem"
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
                label="Amount"
                margin="dense"
                name="amount"
                type="number"
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
                defaultValue="mad"
                fullWidth
                margin="dense"
                name="currency"
                required
                select
                SelectProps={{ native: true }}
                variant="outlined">
                {currencies.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </Controller>

              {/* <TextField
                value={values.state}
                variant="outlined"
              /> */}
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

PledgeForm.propTypes = {
  className: PropTypes.string
};

export default PledgeForm;
