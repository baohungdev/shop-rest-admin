import React, { lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import checkForLoggedIn from 'src/utils/checkForLoggedIn';
import { store } from 'src/AppRenderer';

import {
  name as nameOfWarehouseItem,
  sagas as warehouseItemSagas
} from 'src/views/warehouses/WarehouseItemView/redux';

const WarehouseItemView = lazy(() =>
  import('./WarehouseItemView').then(module => {
    store.injectSaga(nameOfWarehouseItem, warehouseItemSagas);
    return module;
  })
);

const WarehouseContainer = () => {
  return (
    <React.Fragment>
      {checkForLoggedIn() ? (
        <Switch>
          <WarehouseItemView path="/app/warehouses/items" exact />
          <Redirect to="/app/dashboard" />
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
};

export default WarehouseContainer;
