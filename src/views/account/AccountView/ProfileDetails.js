import 'date-fns';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import clsx from 'clsx';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
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

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, userInfo, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const [birthDate, changeBirthDate] = useState(
    moment(userInfo.birthDate).toDate()
  );

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

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
            subheader="The information can be edited"
            title="Profile"
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
                  onChange={handleChange}
                  required
                  value={userInfo.name}
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
                  value={userInfo.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Địa chỉ"
                  name="address"
                  onChange={handleChange}
                  required
                  value={userInfo.address}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  label="Giới tính"
                  name="gender"
                  onChange={handleChange}
                  select
                  SelectProps={{ native: false }}
                  value={userInfo.gender}
                  variant="outlined"
                >
                  {[
                    { value: 0, text: 'Nam' },
                    { value: 1, text: 'Nữ' },
                    { value: 2, text: 'Khác' }
                  ].map(option => (
                    <option key={option.value} value={option.value}>
                      {option.text}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button color="primary" variant="contained">
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
