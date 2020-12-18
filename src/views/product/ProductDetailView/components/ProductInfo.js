import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as productDetailActions
} from 'src/views/product/ProductDetailView/redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Paper,
  Box,
  Button,
  CardActions,
  InputAdornment,
  OutlinedInput,
  InputLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Switch,
  Input,
  colors,
  Fab,
  AppBar,
  Toolbar,
  IconButton
} from '@material-ui/core';

import MUIRichTextEditor from 'mui-rte';
import ProductVariant from './ProductVariant';

import textToMuiRteData from 'src/utils/textToMuiRteData';
import editorStateToText from 'src/utils/editorStateToText';

import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

const muiRteTheme = createMuiTheme();

Object.assign(muiRteTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        marginTop: 20,
        width: '100%'
      },
      toolbar: {
        backgroundColor: '#F4F6F8'
      },
      editor: {
        padding: 15
      }
    }
  }
});

const ProductInfo = ({ view: product, actions }) => {
  let _editorState = null;

  const handleDescriptionChange = () => {
    actions.changeProductDescription(editorStateToText(_editorState));
  };

  return (
    <Card>
      <CardHeader title="Thông tin sản phẩm"></CardHeader>
      <Divider />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="name"
              variant="outlined"
              value={product.name}
              label="Tên sản phẩm"
              required
              onChange={e => actions.changeProductName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <MuiThemeProvider theme={muiRteTheme}>
                <MUIRichTextEditor
                  label="Type something here..."
                  defaultValue={textToMuiRteData(product.description)}
                  onChange={state => {
                    _editorState = state;
                  }}
                  onSave={() => handleDescriptionChange()}
                />
              </MuiThemeProvider>
            </Paper>
          </Grid>
        </Grid>
        <Box mt={3} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Giá bán
              </InputLabel>
              <OutlinedInput
                fullWidth
                value={product.price}
                type="number"
                labelWidth={60}
                required
                endAdornment={
                  <InputAdornment position="end">đồng</InputAdornment>
                }
                name="price"
                onChange={e => actions.changeProductPrice(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Giá vốn
              </InputLabel>
              <OutlinedInput
                fullWidth
                value={product.cost}
                labelWidth={60}
                type="number"
                required
                name="cost"
                onChange={e => actions.changeProductCost(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">đồng</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Số lượng
              </InputLabel>
              <OutlinedInput
                fullWidth
                value={product.quantity}
                labelWidth={60}
                type="number"
                required
                name="quantity"
                onChange={e => actions.changeProductQuantity(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">cái</InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={product.isManageVariant}
                      onChange={e =>
                        actions.changeProductManageVariant(e.target.checked)
                      }
                      name="isManageVariant"
                      color="primary"
                    />
                  }
                  label="Sản phẩm có biến thể"
                />
              </FormGroup>
            </FormControl>
          </Grid>
        </Grid>
        {product.isManageVariant ? (
          <Box mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {product.children.map(child => (
                  <ProductVariant variant={child} />
                ))}
              </Grid>
            </Grid>
          </Box>
        ) : null}
      </CardContent>
      <Box mt={3} />
    </Card>
  );
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...productDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);
