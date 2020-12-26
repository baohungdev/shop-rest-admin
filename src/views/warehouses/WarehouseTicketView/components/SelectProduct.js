import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';

const SelectProduct = ({ actions, products, view }) => {
  const [openOptionProducts, setOpenOptionProducts] = React.useState(false);
  const loading = openOptionProducts && products.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      actions.fetchProducts();
    }

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!openOptionProducts) {
      actions.clearProducts();
    }
  }, [openOptionProducts]);

  return (
    <Autocomplete
      options={products}
      getOptionLabel={option => option.name}
      fullWidth
      multiple
      disabled={view}
      renderOption={option => (
        <React.Fragment>
          <Avatar src={option.avatar} />
          <span style={{ marginLeft: '10px' }}>{option.name}</span>
        </React.Fragment>
      )}
      renderInput={params => (
        <TextField
          {...params}
          label="Chọn sản phẩm"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            )
          }}
        />
      )}
      open={openOptionProducts}
      onOpen={() => {
        setOpenOptionProducts(true);
      }}
      onClose={() => {
        setOpenOptionProducts(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={option => option.name}
      loading={loading}
      onChange={(event, newValues) => {
        actions.selectProduct({ newProducts: newValues, products });
      }}
    />
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseTicketActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectProduct);
