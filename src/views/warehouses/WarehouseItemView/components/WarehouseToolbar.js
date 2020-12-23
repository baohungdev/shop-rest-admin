import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import _isEmpty from 'lodash/isEmpty';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseItemActions
} from 'src/views/warehouses/WarehouseItemView/redux';

const useStyles = makeStyles(theme => ({
  root: {},
  createTiketButton: {
    marginRight: theme.spacing(1)
  }
}));

const WarehouseToolbar = ({
  className,
  actions,
  searchForName,
  tableDisplay,
  ...rest
}) => {
  const classes = useStyles();

  useEffect(() => {
    return () => {
      actions.setSearchForName('');
    };
  }, []);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                value={searchForName}
                placeholder="Tìm kiếm sản phẩm"
                variant="outlined"
                onChange={e => {
                  actions.setSearchForName({
                    name: e.target.value,
                    fetchParam: {
                      page: 0,
                      perpage: tableDisplay.limit
                    }
                  });
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

WarehouseToolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseItemActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(WarehouseToolbar);
