import React, { useState } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _get from 'lodash/get';
import {
  name,
  actions as productActions
} from 'src/views/product/ProductListView/redux';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
});

const LatestProducts = ({ className, actions, products, ...rest }) => {
  const classes = useStyles();

  React.useEffect(() => {
    actions.fetchProductList({
      fetchParams: {
        page: 1,
        perpage: 10
      },
      isVariant: false
    });
  }, []);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        subtitle={`có ${products.length}`}
        title="Sản phẩm mới nhất"
      />
      <Divider />
      <List>
        {rest.isLoadingProducts
          ? [...Array(10)].map((_, i) => (
              <ListItem divider={true}>
                <Skeleton
                  variant="circle"
                  width={40}
                  height={40}
                  animation="wave"
                />
                <Skeleton
                  variant="rect"
                  animation="wave"
                  style={{ width: '100%', height: '20px' }}
                />
                <IconButton edge="end" size="small">
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            ))
          : products.slice(0, 10).map((product, i) => (
              <ListItem divider={i < products.length - 1} key={product.id}>
                <ListItemAvatar>
                  <img
                    alt="Product"
                    className={classes.image}
                    src={_get(product, 'imageUrls.0')}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={product.name}
                  secondary={`Cập nhật ${moment(product.updatedAt).format(
                    'L'
                  )}`}
                />
                <IconButton edge="end" size="small">
                  <MoreVertIcon />
                </IconButton>
              </ListItem>
            ))}
      </List>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Link to="/app/products">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            Xem tất cả
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  return { actions: bindActionCreators(productActions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestProducts);
