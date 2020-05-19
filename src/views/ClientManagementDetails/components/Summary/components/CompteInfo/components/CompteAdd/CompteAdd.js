import React from 'react';
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

const CompteAdd = props => {
  const { open, clientId, onClose, className, ...rest } = props;

  const classes = useStyles();

  const { register, handleSubmit, errors, control } = useForm();

  if (!open) {
    return null;
  }

  const onSubmit = data => {
    addCompte(data);
    onClose();
  };

  const addCompte = data => {
    const request = axios.post('api/comptes', {
      ...data,
      clientId: clientId
    });
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
              Nouveau Compte
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
                  defaultValue=""
                  fullWidth
                  label="RIB"
                  name="rib"
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
                  label="Solde"
                  name="solde"
                  type="number"
                  variant="outlined"
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

CompteAdd.displayName = 'CompteAdd';

CompteAdd.propTypes = {
  className: PropTypes.string,
  client: PropTypes.any,
  clientId: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

CompteAdd.defaultProps = {
  open: false,
  onClose: () => {}
};

export default CompteAdd;
