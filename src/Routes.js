import React, { lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import { NotFound as NotFoundView } from './views';

const bankRoutes = [
  {
    path: '/management/transactions',
    exact: true,
    component: lazy(() => import('views/Transaction'))
  },
  {
    path: '/management/clients',
    component: lazy(() => import('views/ClientManagementList'))
  },
  {
    path: '/management/clients/:id',
    exact: true,
    component: lazy(() => import('views/ClientManagementDetails'))
  },
  {
    path: '/management/clients/:id/:tab',
    exact: true,
    component: lazy(() => import('views/ClientManagementDetails'))
  },
  {
    path: '/pledges/general',
    component: lazy(() => import('views/Pledge'))
  },
  {
    path: '/redeems/general',
    component: lazy(() => import('views/Redeem'))
  },
  {
    path: '/settings/:tab',
    component: lazy(() => import('views/Settings'))
  }
];

const Routes = () => {
  return (
    <Switch>
      {bankRoutes.map(route => (
        <RouteWithLayout
          component={route.component}
          exact
          layout={MainLayout}
          path={route.path}
        />
      ))}
      <Redirect
        exact
        from="/"
        to="/management/clients"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
