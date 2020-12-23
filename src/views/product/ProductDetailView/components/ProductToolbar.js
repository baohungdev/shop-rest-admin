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

import AlertDialog from 'src/components/AlertDialog';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    marginRight: theme.spacing(1)
  }
}));

const ProductToolbar = ({ className, view: product, actions, ...rest }) => {
  const [open, setOpen] = React.useState(false);

  const onDeleteClick = () => {
    setOpen(true);
  };

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <AlertDialog
        open={open}
        title="Xác nhận xóa sản phẩm"
        content="Đây là tác vụ không thể phục hồi, bạn có chắc muốn xóa sản phẩm này không?"
        aggreeText="Xóa"
        disagreeText="Hủy bỏ"
        onAgreeClick={() => {
          setOpen(false);
          actions.deleteProduct(product.id);
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="error"
          className={classes.deleteButton}
          onClick={onDeleteClick}
        >
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
