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
  Switch,
  Button,
  colors
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useQuery } from 'react-query';

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

const getComptes = async () => {
  const { data } = await axios.get('api/comptes');
  return data;
};

const TransactionAdd = props => {
  const { open, onClose, className, ...rest } = props;

  const classes = useStyles();
  const { register, handleSubmit, errors, control, setValue } = useForm();

  const queryInfo = useQuery('comptes', getComptes);

  if (!open) {
    return null;
  }

  const onSubmit = async data => {
    try {
      const request = await axios.post('api/virements', {
        ...data,
        dateExecution: new Date()
      });
      toast.success('You have successfully added a new transfer!');
      onClose();
    } catch (err) {
      if (err.response) {
        // client received an error response (5xx, 4xx)
        toast.error('Error: ' + err.response.data);
      } else if (err.request) {
        // client never received a response, or request never left
        toast.error('Error: No response. Please try again.');
      } else {
        // anything else
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
                  as={
                    <Autocomplete
                      autoSelect
                      freeSolo
                      getOptionLabel={option =>
                        option.rib ? option.rib : option
                      }
                      options={queryInfo.data || []}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          inputProps={{
                            ...params.inputProps
                            //autoComplete: 'disabled' // disable autocomplete and autofill
                          }}
                          label="RIB Emetteur"
                          variant="outlined"
                        />
                      )}
                    />
                  }
                  control={control}
                  defaultValue={''}
                  name="ribEmetteur"
                  onChange={([event, data]) => (data ? data : data)}
                  onInputChange={(e, data) => data}
                />
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <Controller
                  as={
                    <Autocomplete
                      autoSelect
                      freeSolo
                      getOptionLabel={option =>
                        option.rib ? option.rib : option
                      }
                      options={queryInfo.data || []}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          inputProps={{
                            ...params.inputProps
                          }}
                          label="RIB Beneficiaire"
                          variant="outlined"
                        />
                      )}
                    />
                  }
                  control={control}
                  defaultValue={''}
                  name="ribBeneficiaire"
                  onChange={([event, data]) => (data ? data : data)}
                  onInputChange={(e, data) => data}
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
              <Grid
                item
                md={6}
                xs={12}
              >
                <Controller
                  as={TextField}
                  control={control}
                  fullWidth
                  name="dateExecution"
                  type="date"
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

TransactionAdd.displayName = 'TransactionAdd';

TransactionAdd.propTypes = {
  className: PropTypes.string,
  client: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool
};

TransactionAdd.defaultProps = {
  open: false,
  onClose: () => {}
};

export default TransactionAdd;
