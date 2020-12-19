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
  makeStyles
} from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, actions, ...rest }) => {
  const classes = useStyles();

  const [pagination, setPagination] = useState(rest.pagination);
  const [search, setSearch] = useState(rest.search);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.importButton}>Nhập từ file</Button>
        <Button className={classes.exportButton}>Xuất từ file</Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            rest.history.push('/app/products/new');
          }}
        >
          Thêm sản phẩm
        </Button>
      </Box>
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
                value={search}
                placeholder="Tìm kiếm sản phẩm"
                variant="outlined"
                onChange={e => {
                  setSearch(e.target.value);
                  if (_isEmpty(search)) {
                    actions.fetchProductList({
                      fetchParams: { ...pagination },
                      isVariant: false
                    });
                  } else {
                    actions.searchProduct({
                      search: e.target.value,
                      isVariant: false
                    });
                  }
                }}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
