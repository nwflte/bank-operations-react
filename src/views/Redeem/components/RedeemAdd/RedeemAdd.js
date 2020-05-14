import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import axios from 'utils/axios';
import { makeStyles } from '@material-ui/styles';
import {
  Modal,
  Card,
  CardContent,
  CardActions,
  Grid,
  Typography,
  TextField,
  Switch,
  Button,
  colors
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import useRouter from 'utils/useRouter';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: '100%',
    overflowY: 'auto',
    maxWidth: '100%'
  },
  container: {
    marginTop: theme.spacing(3)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const PledgeAdd = props => {
  const { open, onClose, className, ...rest } = props;

  const classes = useStyles();
  const { history } = useRouter();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  React.useEffect(() => {
    register({ name: 'ribBeneficiaire' });
  });

  if (!open) {
    return null;
  }

  const onSubmit = async data => {
    console.log(data);
    try {
      const request = await axios.post('api/obligations/redeems', {
        ...data
      });
      console.log('request', request);
      toast.success('You have successfully added a new redeem request!');
      history.push('pledges');
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log('err.response', err.response);
        toast.error(
          'Error: Redeem request wasn\'t added successfully. Code: ' +
            err.response.status
        );
      } else if (err.request) {
        // client never received a response, or request never left
        console.log('err.request', err.request);
        toast.error('Error: No response. Please try again.');
      } else {
        // anything else
        console.log('err', err);
        toast.error('Unknown Error occured, see the logs');
      }
    }
  };

  const currencies = [
    {
      value: 'MAD',
      label: 'Moroccan Dirham'
    }
  ];

  return (
    <Modal
      onClose={onClose}
      open={open}
    >
      <Card
        {...rest}
        className={clsx(classes.root, className)}
      >
        <form
          autoComplete="on"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CardContent>
            <Typography
              align="center"
              gutterBottom
              variant="h3"
            >
              Nouveau Redeem
            </Typography>
            <Grid
              className={classes.container}
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
                  defaultValue={0}
                  fullWidth
                  label="Montant"
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
              </Grid>

              <Grid item />
              <Grid
                item
                md={6}
                xs={12}
              >
                <Typography variant="h5">Priorité</Typography>
                <Typography variant="body2">
                  Activé pour donner ce redeem la priorité
                </Typography>
                <Controller
                  as={Switch}
                  checked={false}
                  color="secondary"
                  control={control}
                  edge="start"
                  name="priority"
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions className={classes.actions}>
            <Button
              onClick={onClose}
              variant="contained"
            >
              Close
            </Button>
            <Button
              className={classes.saveButton}
              type="submit"
              variant="contained"
            >
              Save
            </Button>
          </CardActions>
        </form>
      </Card>
    </Modal>
  );
};

PledgeAdd.displayName = 'ClientEdit';

PledgeAdd.propTypes = {
  className: PropTypes.string,
  client: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

PledgeAdd.defaultProps = {
  open: false,
  onClose: () => {}
};

export default PledgeAdd;
