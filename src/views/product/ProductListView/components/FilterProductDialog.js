import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Container,
  Box,
  TextField,
  Select,
  Input,
  Menu,
  MenuItem
} from '@material-ui/core';
import _isEmpty from 'lodash/isEmpty';
import { Spinner } from 'src/components/Loading';
import { name, actions as ProductListActions } from '../redux';
import { filterOptions } from '../data';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const FilterProductDialog = ({
  actions,
  open,
  onClose,
  selectedFilterCategories,
  categories,
  ...rest
}) => {
  const [statusesSelected, setStatusesSelected] = React.useState([]);
  const handleChangeStatusesSelected = e => {
    setStatusesSelected(e.target.value);
  };

  const [variantSelected, setVariantSelected] = React.useState(
    filterOptions.variants[0].value
  );
  const handleChangeVariantsSelected = e => {
    setVariantSelected(e.target.value);
  };

  const [priceRangesSelected, setPriceRangesSelected] = React.useState(
    filterOptions.priceRanges[0].value
  );
  const handleChangePriceRangesSelected = e => {
    setPriceRangesSelected(e.target.value);
  };

  useEffect(() => {
    if (!_isEmpty(categories)) {
      return undefined;
    }

    actions.fetchCategories();
  }, []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
      <DialogTitle>Bộ lọc sản phẩm</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          {rest.isLoadingCategories ? (
            <Box textAlign="center">
              <Spinner />
            </Box>
          ) : (
            <React.Fragment>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-mutiple-name-label">
                    Loại sản phẩm
                  </InputLabel>
                  <Select
                    fullWidth
                    multiple
                    variant="outlined"
                    input={<Input variant="outlined" label="Loại sản phẩm" />}
                    onChange={e =>
                      actions.selectFilterCategories(e.target.value)
                    }
                    value={selectedFilterCategories}
                    MenuProps={MenuProps}
                  >
                    {categories.map((c, i) => (
                      <MenuItem value={c.id} key={i}>
                        {c.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-mutiple-name-label">
                    Trạng thái sản phẩm
                  </InputLabel>
                  <Select
                    fullWidth
                    multiple
                    variant="outlined"
                    input={<Input variant="outlined" />}
                    onChange={handleChangeStatusesSelected}
                    value={statusesSelected}
                    MenuProps={MenuProps}
                  >
                    {filterOptions.statuses.map((s, i) => (
                      <MenuItem value={s.value} key={i}>
                        {s.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-mutiple-name-label">Biến thể</InputLabel>
                  <Select
                    fullWidth
                    variant="outlined"
                    input={<Input variant="outlined" />}
                    onChange={handleChangeVariantsSelected}
                    value={variantSelected}
                    MenuProps={MenuProps}
                  >
                    {filterOptions.variants.map((v, i) => (
                      <MenuItem value={v.value} key={i}>
                        {v.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-mutiple-name-label">Giá bán</InputLabel>
                  <Select
                    fullWidth
                    variant="outlined"
                    input={<Input variant="outlined" />}
                    onChange={handleChangePriceRangesSelected}
                    value={priceRangesSelected}
                    MenuProps={MenuProps}
                  >
                    {filterOptions.priceRanges.map((pr, i) => (
                      <MenuItem value={pr.value} key={i}>
                        {pr.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
        <Button
          color="primary"
          onClick={() => {
            onClose();
            actions.applyFilter({
              fetchParams: {
                page: 1,
                perpage: 20
              },
              ...(_isEmpty(selectedFilterCategories)
                ? {}
                : { categoryId: selectedFilterCategories }),
              ...JSON.parse(variantSelected),
              ...(_isEmpty(statusesSelected)
                ? {}
                : { status: statusesSelected }),
              ...JSON.parse(priceRangesSelected)
            });
          }}
        >
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...ProductListActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterProductDialog);
