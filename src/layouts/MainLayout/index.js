import React, { lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import { store } from 'src/AppRenderer';
import { name, sagas } from 'src/views/auth/redux';
import LogoutView from 'src/views/auth/LogoutView';
import NotFoundView from 'src/views/errors/NotFoundView';

const LoginView = lazy(() =>
  import('src/views/auth/LoginView').then(module => {
    store.injectSaga(name, sagas);
    return module;
  })
);

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
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

const MainLayout = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Switch>
              <LoginView path="/login" exact />
              <Route path="/logout" exact component={<LogoutView />} />
              <Route path="/error" exact component={NotFoundView} />
              <Redirect path="/" exact to="/app/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
