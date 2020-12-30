import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Grid,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import _isEmpty from 'lodash/isEmpty';
import FilterListIcon from '@material-ui/icons/FilterList';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { name, actions as cartActions } from 'src/views/carts/redux';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const CartToolbar = ({
  className,
  view: product,
  actions,
  tableDisplay,
  ...rest
}) => {
  const [seletedStatus, changeSeletedStatus] = useState(-1);
  const [dateFilter, setDateFilter] = useState([Date.now(), Date.now()]);
  const classes = useStyles();

  const handleCartFilter = () => {
    actions.fetchCarts({
      fetchParam: {
        page: 0,
        perpage: tableDisplay.limit
      },
      ...(seletedStatus === -1 ? {} : { status: seletedStatus }),
      from: moment(dateFilter[0])
        .startOf('date')
        .toDate(),
      to: moment(dateFilter[1])
        .endOf('date')
        .toDate()
    });
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3} />
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex">
              <Box marginRight={3} width={300}>
                <Select
                  label="Trạng thái đơn"
                  fullWidth
                  variant="outlined"
                  value={seletedStatus}
                  onChange={e => changeSeletedStatus(e.target.value)}
                >
                  <MenuItem value={-1}>Tất cả</MenuItem>
                  <MenuItem value={0}>Đơn mới</MenuItem>
                  <MenuItem value={1}>Khách hàng đã xác nhận</MenuItem>
                  <MenuItem value={2}>Đã xác nhận</MenuItem>
                  <MenuItem value={3}>Khách hàng huỷ đơn</MenuItem>
                  <MenuItem value={4}>Đang đóng gói</MenuItem>
                  <MenuItem value={5}>Đang đợi vận chuyển</MenuItem>
                  <MenuItem value={6}>Đã gửi vận chuyển</MenuItem>
                  <MenuItem value={7}>Đang giao</MenuItem>
                  <MenuItem value={8}>Đã giao</MenuItem>
                  <MenuItem value={9}>Khách hoàn trả</MenuItem>
                  <MenuItem value={10}>Đơn bị huỷ</MenuItem>
                </Select>
              </Box>
              <Box mr={3}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        fullWidth
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        label="Xem từ ngày"
                        onChange={date => setDateFilter([date, dateFilter[1]])}
                        value={dateFilter[0]}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <KeyboardDatePicker
                        fullWidth
                        disableToolbar
                        variant="inline"
                        inputVariant="outlined"
                        format="dd/MM/yyyy"
                        id="date-picker-inline"
                        label="Đến ngày"
                        onChange={date => setDateFilter([dateFilter[0], date])}
                        value={dateFilter[1]}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Box>
              <Button
                color="primary"
                variant="contained"
                startIcon={<FilterListIcon />}
                onClick={handleCartFilter}
              >
                Xem
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

CartToolbar.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CartToolbar);
