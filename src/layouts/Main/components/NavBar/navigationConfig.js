/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';

import { Label } from 'components';

export default [
  {
    title: 'Bank',
    pages: [
      {
        title: 'Dashboards',
        href: '/dashboards',
        icon: DashboardIcon,
        children: [
          {
            title: 'Node',
            href: '/dashboard/node'
          },
          {
            title: 'Analytics',
            href: '/dashboard/analytics'
          }
        ]
      },
      {
        title: 'Management',
        href: '/management',
        icon: BarChartIcon,
        children: [
          {
            title: 'Clients',
            href: '/management/clients'
          },
          {
            title: 'Clients Details',
            href: '/management/clients/1/summary'
          },
          {
            title: 'Virements',
            href: '/management/transactions'
          }
        ]
      },
      {
        title: 'Settings',
        href: '/settings',
        icon: SettingsIcon,
        children: [
          {
            title: 'General',
            href: '/settings/general'
          },
          {
            title: 'Security',
            href: '/settings/security'
          }
        ]
      }
    ]
  },
  {
    title: 'Blockchain System',
    pages: [
      {
        title: 'Pledges',
        href: '/pledges',
        icon: ReceiptIcon,
        label: () => (
          <Label
            color={colors.red[500]}
            shape="rounded"
          >
            2
          </Label>
        ),
        children: [
          {
            title: 'General',
            href: '/pledges/general'
          }
        ]
      },
      {
        title: 'Redeems',
        href: '/redeems',
        icon: ListAltIcon,
        label: () => (
          <Label
            color={colors.red[500]}
            shape="rounded"
          >
            2
          </Label>
        ),
        children: [
          {
            title: 'General',
            href: '/redeems/general'
          }
        ]
      },
      {
        title: 'DDR',
        href: '/ddr',
        icon: ListAltIcon,
        label: () => (
          <Label
            color={colors.red[500]}
            shape="rounded"
          >
            2
          </Label>
        ),
        children: [
          {
            title: 'Dashboard',
            href: '/ddr/dashboard'
          }
        ]
      }
    ]
  }
];
