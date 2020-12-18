import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as productDetailActions
} from 'src/views/product/ProductDetailView/redux';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const ProductToolbar = ({ className, view: product, actions, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button color="error" className={classes.exportButton}>
          Xoá sản phẩm
        </Button>
        <Button
          color="secondary"
          variant="contained"
          onClick={e => actions.saveProduct(product)}
        >
          Lưu sản phẩm
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
  const actions = { ...productDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductToolbar);
