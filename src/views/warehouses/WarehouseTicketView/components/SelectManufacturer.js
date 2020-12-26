import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';

const SelectManufacturer = ({
  actions,
  manufacturers,
  view,
  warehouseTransaction,
  newWarehouseTransaction
}) => {
  const info = view ? warehouseTransaction : newWarehouseTransaction;
  const [openOptionManufacturers, setOpenOptionManufacturers] = React.useState(
    false
  );
  const loading = openOptionManufacturers && manufacturers.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (active) {
      actions.fetchManufacturers();
    }

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!openOptionManufacturers) {
      actions.clearManufacturers();
    }
  }, [openOptionManufacturers]);

  return (
    <Autocomplete
      options={manufacturers}
      getOptionLabel={option => option.name}
      fullWidth
      disabled={view}
      value={info.manufacturer}
      renderInput={params => (
        <TextField
          {...params}
          label="Chọn nhà cung cấp"
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
      open={openOptionManufacturers}
      onOpen={() => {
        setOpenOptionManufacturers(true);
      }}
      onClose={() => {
        setOpenOptionManufacturers(false);
      }}
      getOptionSelected={(option, value) => option.id === value.id}
      getOptionLabel={option => option.name}
      loading={loading}
      onChange={(event, newValue) => {
        actions.selectManufacturer(newValue);
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectManufacturer);
