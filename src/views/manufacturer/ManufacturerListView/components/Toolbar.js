import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import { Search as SearchIcon } from 'react-feather';
import {
  name,
  actions as manufacturerActions
} from 'src/views/manufacturer/ManufacturerListView/redux';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({
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
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.importButton}>Thêm từ file</Button>
        <Button className={classes.exportButton}>Xuất file</Button>
        <Button color="primary" variant="contained">
          Thêm nhà cung cấp
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                value={searchForName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Tìm kiếm nhà cung cấp"
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

Toolbar.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...manufacturerActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
