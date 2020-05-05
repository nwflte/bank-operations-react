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
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';

import { Label } from 'components';
import { VirementAdd } from './components';
import axios from 'utils/axios';

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

  const [compte, setCompte] = React.useState({});

  const [openAdd, setOpenAdd] = React.useState(false);

  // TODO get account
  React.useEffect(() => {
    let mounted = true;

    const fetchAccount = () => {
      axios.get(`/api/utilisateurs/${client.id}/compte`).then(response => {
        if (mounted) {
          setCompte(response.data);
        }
      });
    };

    fetchAccount();

    return () => {
      mounted = false;
    };
  }, []);

  const handleEditOpen = () => {};

  const handleAddOpen = () => {
    setOpenAdd(true);
  };
  const handleAddClose = () => {
    setOpenAdd(false);
  };

  return (
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
              <TableCell>{compte.rib}</TableCell>
            </TableRow>
            <TableRow selected>
              <TableCell>Solde</TableCell>
              <TableCell>{compte.solde}</TableCell>
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
        <Button onClick={handleAddOpen}>
          <AttachMoneyIcon className={classes.buttonIcon} />
          Nouveau Virement
        </Button>
      </CardActions>
      <VirementAdd
        onClose={handleAddClose}
        open={openAdd}
        ribEmetteur={compte.rib}
      />
    </Card>
  );
};

CompteInfo.propTypes = {
  className: PropTypes.string,
  client: PropTypes.object.isRequired
};

export default CompteInfo;
