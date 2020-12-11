import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { PersistGate } from 'redux-persist/integration/react';
import GlobalStyles from 'src/components/GlobalStyles';
import Loading from 'src/components/Loading';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import { configureStore } from './redux/store';

const intialStates = {
  userInfo: {
    name: 'John Doe',
    email: 'example@gmail.com',
    avatar: ''
  }
};

const { store, history, persistor } = configureStore(intialStates);

const DashboarLayout = lazy(() => import('src/layouts/DashboardLayout'));
const MainLayout = lazy(() => import('src/layouts/MainLayout'));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <PersistGate persistor={persistor} loading={<Loading />}>
        <ConnectedRouter history={history}>
          <Switch>
            <DashboarLayout path="/app" />
            <MainLayout path="/" />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </ThemeProvider>
  );
};

export default App;
export { store, history };
