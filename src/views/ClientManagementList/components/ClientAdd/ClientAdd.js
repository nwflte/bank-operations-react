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
  FormControl,
  Typography,
  TextField,
  MenuItem,
  Select,
  Button,
  colors,
  FormHelperText
} from '@material-ui/core';
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

const ClientAdd = props => {
  const { open, onClose, className, ...rest } = props;

  const { history } = useRouter();
  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();

  if (!open) {
    return null;
  }

  const onSubmit = async data => {
    console.log(data);
    try {
      const request = await axios.post('api/clients', {
        ...data
      });
      toast.success('You have added a new client!');
      onClose();
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        console.log('err.response', err.response);
        toast.error(
          'Error: Client wasn\'t added successfully. Code: ' +
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
              Nouveau Client
            </Typography>
            <FormControl error={Boolean(errors.wordlevel)}>
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
                    defaultValue=""
                    fullWidth
                    label="Prénom"
                    name="firstname"
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
                    label="Nom"
                    name="lastname"
                    rules={{ required: 'this is required' }}
                    variant="outlined"
                  />
                </Grid>
                <Grid
                  item
                  md={6}
                  xs={12}
                >
                  <Controller
                    as={
                      <Select>
                        <MenuItem value="MALE">Male</MenuItem>
                        <MenuItem value="FEMALE">Female</MenuItem>
                      </Select>
                    }
                    control={control}
                    defaultValue="MALE"
                    fullWidth
                    name="gender"
                    rules={{ required: 'this is required' }}
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
                    label="Ville"
                    name="ville"
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
                    label="Adresse"
                    name="adresse1"
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
                    fullWidth
                    name="birthdate"
                    type="date"
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
                    label="Email"
                    name="email"
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
                    label="Username"
                    name="username"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <FormHelperText>
                {errors.wordlevel && errors.wordlevel.message}
              </FormHelperText>
            </FormControl>
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

ClientAdd.displayName = 'ClientEdit';

ClientAdd.propTypes = {
  className: PropTypes.string,
  client: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

ClientAdd.defaultProps = {
  open: false,
  onClose: () => {}
};

export default ClientAdd;
