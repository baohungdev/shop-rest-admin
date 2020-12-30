import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import CartList from './components/CartList';
import CartToolbar from './components/Toolbar';
import { name, actions } from './redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ListOrderView = ({}) => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Đơn hàng">
      <Container maxWidth={false}>
        <Box mt={3} />
        <CartToolbar />
        <Box mt={3}>
          <CartList />
        </Box>
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderView);
