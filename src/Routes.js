import React, { lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  NotFound as NotFoundView
} from './views';

const bankRoutes = [
  {
    path: '/dashboard',
    component: DashboardView
  },
  {
    path: '/management/transactions',
    exact: true,
    component: lazy(() => import('views/Transaction'))
  },
  {
    path: '/management/transactions/add',
    component: lazy(() => import('views/Transaction/components/AddTransaction'))
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
    path: '/pledges/add',
    component: lazy(() => import('views/Pledge/components/AddPledge'))
  },
  {
    path: '/redeems/general',
    component: lazy(() => import('views/Redeem'))
  },
  {
    path: '/redeems/add',
    component: lazy(() => import('views/Redeem/components/AddRedeem'))
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
        to="/dashboard"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={ProductListView}
        exact
        layout={MainLayout}
        path="/products"
      />
      <RouteWithLayout
        component={TypographyView}
        exact
        layout={MainLayout}
        path="/typography"
      />
      <RouteWithLayout
        component={IconsView}
        exact
        layout={MainLayout}
        path="/icons"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
