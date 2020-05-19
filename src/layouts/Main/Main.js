import React, { useState, Suspense } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery, LinearProgress } from '@material-ui/core';

import { Topbar, Footer, NavBar } from './components';

const useStyles2 = makeStyles(() => ({
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  topBar: {
    zIndex: 2,
    position: 'relative'
  },
  container: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  /* navBar: {
    zIndex: 3,
    width: 256,
    minWidth: 256,
    flex: '0 0 auto'
  }, */
  navBar: {
    zIndex: 3,
    width: 200,
    minWidth: 200,
    flex: '0 0 auto',
    background: {
      paper: '#2c003e'
    }
  },
  content: {
    overflowY: 'auto',
    flex: '1 1 auto'
  }
}));

const Dashboard = props => {
  const { children } = props;

  const classes = useStyles2();
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);

  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };

  const handleNavBarMobileClose = () => {
    setOpenNavBarMobile(false);
  };

  return (
    <div className={classes.root}>
      <Topbar
        className={classes.topBar}
        onOpenNavBarMobile={handleNavBarMobileOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onMobileClose={handleNavBarMobileClose}
          openMobile={openNavBarMobile}
        />
        <main className={classes.content}>
          <Suspense fallback={<LinearProgress />}>
            {/* {renderRoutes(route.routes)} */}
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  );
};

const Main = props => {
  const { children } = props;

  const classes = useStyles2();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}
    >
      <Topbar
        className={classes.topBar}
        onSidebarOpen={handleSidebarOpen}
      />
      <div className={classes.container}>
        <NavBar
          className={classes.navBar}
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          //variant={isDesktop ? 'persistent' : 'temporary'}
        />
        <main className={classes.content}>
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
};

export default Dashboard;
