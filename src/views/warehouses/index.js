import React, { lazy } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import checkForLoggedIn from 'src/utils/checkForLoggedIn';
import { store } from 'src/AppRenderer';

import {
  name as nameOfWarehouseItem,
  sagas as warehouseItemSagas
} from 'src/views/warehouses/WarehouseItemView/redux';

import {
  name as nameOfWarehouseTicket,
  sagas as warehouseTicketSagas
} from 'src/views/warehouses/WarehouseTicketView/redux';

const WarehouseItemView = lazy(() =>
  import('./WarehouseItemView').then(module => {
    store.injectSaga(nameOfWarehouseItem, warehouseItemSagas);
    return module;
  })
);

const WarehousTicketView = lazy(() =>
  import('./WarehouseTicketView').then(module => {
    store.injectSaga(nameOfWarehouseTicket, warehouseTicketSagas);
    return module;
  })
);

const WarehouseContainer = () => {
  return (
    <React.Fragment>
      {checkForLoggedIn() ? (
        <Switch>
          <WarehouseItemView path="/app/warehouses/items" exact />
          <WarehousTicketView path="/app/warehouses/tickets" exact />
          <Redirect to="/app/dashboard" />
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
};

export default WarehouseContainer;
