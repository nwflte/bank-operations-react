import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  colors
} from '@material-ui/core';

import axios from 'utils/axios';
import { useQuery } from 'react-query';

import { Label, GenericMoreButton } from 'components';

const useStyles = makeStyles(() => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1150
  }
}));

const Virements = props => {
  const { clientId, className, ...rest } = props;

  const classes = useStyles();

  const getVirements = async () => {
    const { data } = await axios.get(`/api/clients/${clientId}/virements`);
    return data;
  };

  const queryInfo = useQuery('virements', getVirements);

  const statusColors = {
    pending: colors.orange[600],
    accepted: colors.green[600],
    rejected: colors.red[600]
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Virements"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>RIB Emetteur</TableCell>
                    <TableCell>RIB Beneficiaire</TableCell>
                    <TableCell>Montant</TableCell>
                    <TableCell>Motif</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {queryInfo.data &&
                    queryInfo.data.map(virement => (
                      <TableRow key={virement.id}>
                        <TableCell>#{virement.id}</TableCell>
                        <TableCell>{virement.ribEmetteur}</TableCell>
                        <TableCell>{virement.ribBeneficiaire}</TableCell>
                        <TableCell>{virement.amount}</TableCell>
                        <TableCell>{virement.motif}</TableCell>
                        <TableCell>
                          {moment(virement.date).format('DD/MM/YYYY | HH:MM')}
                        </TableCell>
                        <TableCell>
                          <Label
                            color={statusColors[virement.status]}
                            variant="outlined"
                          >
                            {virement.status}
                          </Label>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            color="primary"
                            component={RouterLink}
                            size="small"
                            to={'/management/virements/1'}
                            variant="outlined"
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

Virements.propTypes = {
  className: PropTypes.string
};

export default Virements;
