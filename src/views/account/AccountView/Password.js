import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';

import {
  name,
  actions as accountActions
} from 'src/views/account/AccountView/redux';

const useStyles = makeStyles({
  root: {}
});

const Password = ({
  className,
  isPasswordLoading,
  isLoading,
  actions,
  ...rest
}) => {
  const classes = useStyles();

  const [isPasswordMismatch, setPasswordMismatch] = useState(false);
  const [isCurrentPasswordTouched, setCurrentPasswordTouched] = useState(false);
  const [isNewPasswordTouched, setNewPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [values, setValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirm: ''
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          subheader="Hãy thay đổi mật khẩu thường xuyên"
          title="Mật khẩu"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Mật khẩu hiện tại"
            margin="normal"
            error={isCurrentPasswordTouched && _isEmpty(values.currentPassword)}
            helperText={
              isCurrentPasswordTouched &&
              _isEmpty(values.currentPassword) &&
              'Vui lòng điền mật khẩu hiện tại'
            }
            name="currentPassword"
            onChange={handleChange}
            onClick={() => setCurrentPasswordTouched(true)}
            type="password"
            value={values.currentPassword}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Mật khẩu mới"
            margin="normal"
            error={isNewPasswordTouched && _isEmpty(values.newPassword)}
            helperText={
              isNewPasswordTouched &&
              _isEmpty(values.newPassword) &&
              'Vui lòng điền mật khẩu mới'
            }
            name="newPassword"
            onChange={handleChange}
            onClick={() => setNewPasswordTouched(true)}
            type="password"
            value={values.newPassword}
            variant="outlined"
            required
          />
          <TextField
            fullWidth
            label="Xác nhận mật khẩu mới"
            error={isConfirmPasswordTouched && isPasswordMismatch}
            helperText={
              isConfirmPasswordTouched &&
              isPasswordMismatch &&
              'Mật khẩu không trùng khớp'
            }
            margin="normal"
            name="confirm"
            onClick={() => setConfirmPasswordTouched(true)}
            onChange={e => {
              handleChange(e);
              setPasswordMismatch(values.confirm !== values.newPassword);
            }}
            type="password"
            value={values.confirm}
            variant="outlined"
            required
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="contained"
            disabled={isPasswordLoading || isLoading}
            onClick={() => actions.updatePassword(values)}
          >
            {isPasswordLoading ? 'Đang cập nhật' : 'Cập nhật'}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...accountActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
