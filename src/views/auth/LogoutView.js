import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as authActionCreators from 'src/views/auth/redux/actions';

class LogoutView extends Component {
  componentWillMount() {
    this.props.dispatch(authActionCreators.logout());
  }

  render() {
    return null;
  }
}

export default connect()(LogoutView);
