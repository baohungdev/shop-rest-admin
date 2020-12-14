import 'date-fns';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  MenuItem
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
  name,
  actions as accountActions
} from 'src/views/account/AccountView/redux';

const useStyles = makeStyles(theme => ({}));

const ProfileDetails = ({ className, userInfo, actions, ...rest }) => {
  const classes = useStyles();

  const [birthDate, changeBirthDate] = useState(
    moment(userInfo.birthDate).toDate()
  );

  const [name, changeName] = useState(userInfo.name);

  const [phone, changePhone] = useState(userInfo.phone);

  const [address, changeAddress] = useState(userInfo.address);

  const [gender, changeGender] = useState(userInfo.gender);

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <form
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="Cập nhật thông tin của bạn ở form dưới"
            title="Thông tin cá nhân"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  helperText="Vui lòng điền tên đầy đủ"
                  label="Họ và tên"
                  name="fullName"
                  onChange={event => changeName(event.target.value)}
                  required
                  value={name}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <KeyboardDatePicker
                  fullWidth
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  id="date-picker-inline"
                  label="Ngày sinh"
                  onChange={date => changeBirthDate(date)}
                  value={birthDate}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  disabled={true}
                  required
                  value={userInfo.email}
                  variant="outlined"
                  helperText="Email không thể được thay đổi"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Số điện thoại"
                  name="phone"
                  onChange={event => changePhone(event.target.value)}
                  value={phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  onChange={event => changeAddress(event.target.value)}
                  required
                  value={address}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Giới tính"
                  name="gender"
                  onChange={event => {
                    changeGender(event.target.value);
                  }}
                  select
                  SelectProps={{ native: false }}
                  value={gender}
                  variant="outlined"
                >
                  {[
                    { value: 0, text: 'Nam' },
                    { value: 1, text: 'Nữ' },
                    { value: 2, text: 'Khác' }
                  ].map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.text}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() =>
                actions.updateUserInfo({
                  data: {
                    name,
                    birthDate,
                    gender,
                    address,
                    phone,
                    avatar: userInfo.avatar
                  }
                })
              }
            >
              Lưu
            </Button>
          </Box>
        </Card>
      </form>
    </MuiPickersUtilsProvider>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
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

  return { actions: bindActionCreators(actions, dispatch) };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDetails)
);
