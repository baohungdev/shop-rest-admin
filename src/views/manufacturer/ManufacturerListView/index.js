import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Page from 'src/components/Page';
import Results from './components/Results';
import Toolbar from './components/Toolbar';
import ManufacturerInfo from './components/ManufacturerInfo';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import {
  name,
  actions as manufacturerActions
} from 'src/views/manufacturer/ManufacturerListView/redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ManufacturerListView = ({ actions, ...rest }) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Nhà cung cấp">
      <Container maxWidth={false}>
        {rest.showManufacturerInfo ? (
          <ManufacturerInfo />
        ) : (
          <React.Fragment>
            <Toolbar />
            <Box mt={3}>
              <Results />
            </Box>
          </React.Fragment>
        )}
        <Snackbar
          open={rest.isShowSnackbar}
          autoHideDuration={6000}
          onClose={actions.closeSnackbar}
        >
          <MuiAlert
            severity={rest.isSnackbarError ? 'error' : 'success'}
            elevation={6}
            onClose={actions.closeSnackbar}
            variant="filled"
          >
            {rest.snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...manufacturerActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManufacturerListView);
