import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, makeStyles } from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import mapStatusCodeToText from '../utils/mapStatusCodeToText';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import { name, actions as cartActions } from 'src/views/carts/redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from 'react-router-dom';

import AlertDialog from 'src/components/AlertDialog';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    marginRight: theme.spacing(1)
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  }
}));

const CartDetailToolbar = ({ className, singleCart, actions, ...rest }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateStatus = status => {
    handleClose();
    if (status !== singleCart.status) {
      actions.updateCartStatus({ id: singleCart.id, status });
    }
  };

  const onDeleteClick = () => {
    setOpen(true);
  };

  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Backdrop
        className={classes.backdrop}
        open={rest.isSendingToServer || rest.isFetchingCart}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <AlertDialog
        open={open}
        title="Xác nhận huỷ đơn hàng"
        content="Đây là tác vụ không thể phục hồi, bạn có chắc muốn huỷ đơn hàng này không?"
        aggreeText="Xóa"
        disagreeText="Hủy bỏ"
        onAgreeClick={() => {
          setOpen(false);
        }}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Box display="flex" justifyContent="flex-start">
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleClick}
            startIcon={<CheckIcon />}
          >
            {mapStatusCodeToText(singleCart.status)}
          </Button>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={() => handleUpdateStatus(1)}>
              Khách hàng đã xác nhận
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(2)}>
              Đã xác nhận
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(3)}>
              Khách hàng huỷ đơn
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(4)}>
              Đang đóng gói
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(5)}>
              Đang đợi vận chuyển
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(6)}>
              Đã gửi vận chuyển
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(7)}>Đang giao</MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(8)}>Đã giao</MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(9)}>
              Khách hoàn trả
            </MenuItem>
            <MenuItem onClick={() => handleUpdateStatus(10)}>
              Đơn bị huỷ
            </MenuItem>
          </Menu>
        </div>
        <Box ml={2} />
        <Button
          color="error"
          className={classes.deleteButton}
          variant="outlined"
          onClick={() => history.push('/app/carts')}
        >
          Quay về
        </Button>
      </Box>
      <Box mt={3} />
    </div>
  );
};

CartDetailToolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...cartActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetailToolbar);
