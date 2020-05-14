/* eslint-disable react/no-multi-comp */
/* eslint-disable react/display-name */
import React from 'react';
import { colors } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ChatIcon from '@material-ui/icons/ChatOutlined';
import CodeIcon from '@material-ui/icons/Code';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import FolderIcon from '@material-ui/icons/FolderOutlined';
import HomeIcon from '@material-ui/icons/HomeOutlined';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LockOpenIcon from '@material-ui/icons/LockOpenOutlined';
import MailIcon from '@material-ui/icons/MailOutlined';
import PresentToAllIcon from '@material-ui/icons/PresentToAll';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import PersonIcon from '@material-ui/icons/PersonOutlined';
import ReceiptIcon from '@material-ui/icons/ReceiptOutlined';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import ViewModuleIcon from '@material-ui/icons/ViewModule';

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
            title: 'Default',
            href: '/dashboard'
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
            title: 'Comptes',
            href: '/management/accounts'
          },
          {
            title: 'Virements',
            href: '/management/transactions'
          },
          {
            title: 'Add Virement',
            href: '/management/transactions/add'
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
      }
    ]
  }
];
