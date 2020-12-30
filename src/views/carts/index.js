import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import checkForLoggedIn from 'src/utils/checkForLoggedIn';

import ListOrderView from './List';
import DetailOrderView from './View';

const CartContainer = ({}) => {
  return (
    <React.Fragment>
      {checkForLoggedIn() ? (
        <Switch>
          <Route path="/app/carts" exact component={ListOrderView} />
          <Route path="/app/carts/view" exact component={DetailOrderView} />
          <Redirect to="/app/dashboard" />
        </Switch>
      ) : (
        <Redirect to="/login" />
      )}
    </React.Fragment>
  );
};

export default CartContainer;
