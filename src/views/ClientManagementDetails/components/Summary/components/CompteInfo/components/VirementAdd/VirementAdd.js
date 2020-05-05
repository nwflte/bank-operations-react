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
import { useForm, Controller } from 'react-hook-form';

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

const addTransaction = data => {
  const request = axios.post('api/virements', {
    ...data,
    date: new Date()
  });
};

const VirementAdd = props => {
  const { open, ribEmetteur, onClose, className, ...rest } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();

  if (!open) {
    return null;
  }

  const onSubmit = data => {
    console.log(data);
    addTransaction(data);
    onClose();
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
              Nouveau Virement
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
                  defaultValue={ribEmetteur}
                  fullWidth
                  label="RIB Emetteur"
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
                  label="RIB Beneficiaire"
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
                  label="Nom du Beneficiaire"
                  name="nom"
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
                  label="Motif du virement"
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
                  defaultValue="MAD"
                  fullWidth
                  label="Currency"
                  name="currency"
                  variant="outlined"
                />
              </Grid>

              <Grid item />
              <Grid
                item
                md={6}
                xs={12}
              >
                <Typography variant="h5">Priorité</Typography>
                <Typography variant="body2">
                  Activé pour donner ce virement la priorité sur le Blockchain
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

VirementAdd.displayName = 'ClientEdit';

VirementAdd.propTypes = {
  className: PropTypes.string,
  client: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

VirementAdd.defaultProps = {
  open: false,
  onClose: () => {}
};

export default VirementAdd;
