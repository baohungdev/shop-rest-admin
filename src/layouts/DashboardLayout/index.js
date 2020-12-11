import React, { useState, lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import checkForLoggedIn from 'src/utils/checkForLoggedIn';

const AccountView = lazy(() => import('src/views/account/AccountView'));
const CustomerListView = lazy(() =>
  import('src/views/customer/CustomerListView')
);
const ProductListView = lazy(() => import('src/views/product/ProductListView'));
const SettingsView = lazy(() => import('src/views/settings/SettingsView'));
const DashboardView = lazy(() => import('src/views/reports/DashboardView'));

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {checkForLoggedIn() ? (
              <Switch>
                <AccountView path="/app/account" exact />
                <CustomerListView path="/app/customers" exact />
                <DashboardView path="/app/dashboard" exact />
                <ProductListView path="/app/products" exact />
                <SettingsView path="/app/settings" exact />
                <Redirect to="/app/dashboard" />
              </Switch>
            ) : (
              <Redirect to="/login" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
