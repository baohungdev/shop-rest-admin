import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';

import MainLayout from 'src/layouts/MainLayout';
import { configureStore } from './redux/store';
import DashboardLayout from 'src/layouts/DashboardLayout';

export const { store, history } = configureStore();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <ConnectedRouter history={history}>
        <BrowserRouter>
          <Switch>
            <Route path="/app" component={DashboardLayout} />
            <Route path="/" component={MainLayout} />
          </Switch>
        </BrowserRouter>
      </ConnectedRouter>
    </ThemeProvider>
  );
};

export default App;
