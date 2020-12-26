import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import WarehouseTicketView from './List';
import NewWarehouseTicketView from './NewWarehouseTicketView';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';

const WarehouseTicketContainer = ({ actions }) => {
  return (
    <Switch>
      <Route
        path="/app/warehouses/tickets/new"
        exact
        component={NewWarehouseTicketView}
      />
      <Route
        path="/app/warehouses/tickets"
        exact
        component={WarehouseTicketView}
      />
    </Switch>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseTicketActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehouseTicketContainer);
