import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  colors
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import { Label } from 'components';
import { VirementAdd, CompteAdd } from './components';
import axios from 'utils/axios';
import { useQuery } from 'react-query';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  actions: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > * + *': {
      marginLeft: 0
    }
  },
  buttonIcon: {
    marginRight: theme.spacing(1)
  }
}));

const CompteInfo = props => {
  const { client, className, ...rest } = props;

  const classes = useStyles();

  const [openAddVirement, setOpenAddVirement] = React.useState(false);
  const [openAddCompte, setOpenAddCompte] = React.useState(false);

  const getCompte = async () => {
    const { data } = await axios.get(`/api/clients/${client.id}/compte`);
    return data;
  };

  const queryInfo = useQuery('compteInfo', getCompte);

  const handleEditOpen = () => {};

  const handleAddVirementOpen = () => {
    setOpenAddVirement(true);
  };
  const handleAddVirementClose = () => {
    setOpenAddVirement(false);
  };

  const handleAddAccountOpen = () => {
    setOpenAddCompte(true);
  };
  const handleAddAccountClose = () => {
    setOpenAddCompte(false);
  };

  return queryInfo.data ? (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Compte Details" />
      <Divider />
      <CardContent className={classes.content}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>RIB</TableCell>
              <TableCell>{queryInfo.data.rib}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Solde</TableCell>
              <TableCell>{queryInfo.data.solde}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Bloqué</TableCell>
              <TableCell>
                {client.iban}
                <div>
                  <Label
                    color={
                      !client.blocked ? colors.green[600] : colors.red[600]
                    }
                  >
                    {!client.blocked ? 'YES' : 'NO'}
                  </Label>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleEditOpen}>
          <EditIcon className={classes.buttonIcon} />
          Edit
        </Button>
        <Button onClick={handleAddVirementOpen}>
          <AttachMoneyIcon className={classes.buttonIcon} />
          Nouveau Virement
        </Button>
      </CardActions>
      <VirementAdd
        onClose={handleAddVirementClose}
        open={openAddVirement}
        ribEmetteur={queryInfo.data.rib}
      />
    </Card>
  ) : (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardActions className={classes.actions}>
        <Button onClick={handleAddAccountOpen}>
          <EditIcon className={classes.buttonIcon} />
          Créer un compte pour ce client
        </Button>
      </CardActions>
      <CompteAdd
        clientId={client.id}
        onClose={handleAddAccountClose}
        open={openAddCompte}
      />
    </Card>
  );
};

CompteInfo.propTypes = {
  className: PropTypes.string,
  client: PropTypes.object.isRequired
};

export default CompteInfo;
