import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as newProductDetailActions
} from 'src/views/product/NewProductDetailView/redux';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    marginRight: theme.spacing(1)
  }
}));

const ProductToolbar = ({ className, add: product, actions, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={classes.root} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          onClick={e => actions.addProduct(product)}
        >
          Thêm sản phẩm
        </Button>
      </Box>
      <Box mt={3} />
    </div>
  );
};

ProductToolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...newProductDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductToolbar);
