import React, { lazy } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import { store } from '../../App';

import { name as nameLogin, sagas as LoginSagas } from 'src/views/auth/redux';
// const LoginView = lazy(() => import('src/views/auth/LoginView'));

const LoginView = lazy(() =>
  import('src/views/auth/LoginView').then((module) => {
    store.injectSaga(nameLogin, LoginSagas);
    return module;
  })
);

const useStyles = makeStyles((theme) => ({
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
              <Redirect path="/" exact to="/app/dashboard" />
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
