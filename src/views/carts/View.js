import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Box, Container, makeStyles, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import { useLocation, useHistory } from 'react-router-dom';
import { name, actions } from './redux';
import CustomerCard from './components/CustomerCard';
import TimeLine from './components/Timeline';
import ProductCard from './components/ProductCard';
import CartDetailToolbar from './components/CartDetailToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DetailOrderView = ({ actions, singleCart }) => {
  const history = useHistory();
  const classes = useStyles();
  const queries = new URLSearchParams(useLocation().search);
  const cartId = queries.get('id') || null;

  if (!cartId) {
    history.push('/');
  }

  useEffect(() => {
    actions.fetchCartDetail({ id: cartId });
  }, []);

  return (
    <Page className={classes.root} title="Xem đơn hàng">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CartDetailToolbar />
          </Grid>
          <Grid item xs={8}>
            <CustomerCard />
            <Box mt={3} />
            <ProductCard />
          </Grid>
          <Grid item xs={4}>
            <TimeLine />
          </Grid>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrderView);
