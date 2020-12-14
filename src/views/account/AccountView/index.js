import React, { useEffect } from 'react';
import { Container, Grid, makeStyles, Box } from '@material-ui/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import * as accountActions from 'src/views/account/AccountView/redux/actions';
import { name } from 'src/views/account/AccountView/redux';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import Password from './Password';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = ({ userInfo, actions }) => {
  const classes = useStyles();

  useEffect(() => {
    actions.fetchUserInfo();
  }, []);

  return (
    <Page className={classes.root} title="Account" {...userInfo}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <Box mt={3}>
              <Password />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    ...accountActions
  };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Account)
);
