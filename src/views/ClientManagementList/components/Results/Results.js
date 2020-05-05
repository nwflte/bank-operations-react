import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';

import getInitials from 'utils/getInitials';
import { GenericMoreButton, TableEditBar } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 700
  },
  nameCell: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, clients, ...rest } = props;

  const classes = useStyles();

  const [selectedClients, setSelectedClients] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSelectAll = event => {
    const selectedClients = event.target.checked
      ? clients.map(client => client.id)
      : [];

    setSelectedClients(selectedClients);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedClients.indexOf(id);
    let newSelectedClients = [];

    if (selectedIndex === -1) {
      newSelectedClients = newSelectedClients.concat(selectedClients, id);
    } else if (selectedIndex === 0) {
      newSelectedClients = newSelectedClients.concat(selectedClients.slice(1));
    } else if (selectedIndex === selectedClients.length - 1) {
      newSelectedClients = newSelectedClients.concat(
        selectedClients.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedClients = newSelectedClients.concat(
        selectedClients.slice(0, selectedIndex),
        selectedClients.slice(selectedIndex + 1)
      );
    }

    setSelectedClients(newSelectedClients);
  };

  const handleChangePage = (event, page) => {
    setPage(page);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >
        {clients.length} Records found. Page {page + 1} of{' '}
        {Math.ceil(clients.length / rowsPerPage)}
      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="All clients"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedClients.length === clients.length}
                        color="primary"
                        indeterminate={
                          selectedClients.length > 0 &&
                          selectedClients.length < clients.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Nom</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Adresse</TableCell>
                    <TableCell>Genre</TableCell>
                    <TableCell>Date de naissance</TableCell>
                    <TableCell>Reviews</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clients.slice(0, rowsPerPage).map(client => (
                    <TableRow
                      hover
                      key={client.id}
                      selected={selectedClients.indexOf(client.id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedClients.indexOf(client.id) !== -1}
                          color="primary"
                          onChange={event => handleSelectOne(event, client.id)}
                          value={selectedClients.indexOf(client.id) !== -1}
                        />
                      </TableCell>
                      <TableCell>
                        <div className={classes.nameCell}>
                          <Avatar
                            className={classes.avatar}
                            src={client.avatar}
                          >
                            {client.firstName}
                          </Avatar>
                          <div>
                            <Link
                              color="inherit"
                              component={RouterLink}
                              to={`/management/clients/${client.id}`}
                              variant="h6"
                            >
                              {client.lastname + ' ' + client.firstname}
                            </Link>
                            <div>{client.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{client.ville}</TableCell>
                      <TableCell>{client.adresse1} </TableCell>
                      <TableCell>{client.gender}</TableCell>
                      <TableCell>{client.birthdate}</TableCell>
                      <TableCell />
                      <TableCell align="right">
                        <Button
                          color="primary"
                          component={RouterLink}
                          size="small"
                          to={`/management/clients/${client.id}`}
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
        <CardActions className={classes.actions}>
          <TablePagination
            component="div"
            count={clients.length}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardActions>
      </Card>
      <TableEditBar selected={selectedClients} />
    </div>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  clients: PropTypes.array.isRequired
};

Results.defaultProps = {
  clients: []
};

export default Results;
