import React, { useState } from 'react';
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
  colors
} from '@material-ui/core';

import MUIRichTextEditor from 'mui-rte';
import ProductVariant from './ProductVariant';

import textToMuiRteData from 'src/utils/textToMuiRteData';
import editorStateToText from 'src/utils/editorStateToText';

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

const ProductInfo = ({ product, actions }) => {
  const [productState, setProductState] = useState(product);

  let _editorState = null;

  const handleTextChange = e => {
    setProductState(previous => {
      return {
        ...previous,
        [e.target.name]: e.target.value
      };
    });
  };

  const handleCheckboxChange = e => {
    setProductState(previous => {
      return {
        ...previous,
        [e.target.name]: e.target.checked
      };
    });
  };

  const handleDescriptionChange = () => {
    setProductState(previous => {
      return {
        ...previous,
        description: editorStateToText(_editorState)
      };
    });
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
              value={productState.name}
              label="Tên sản phẩm"
              required
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <MuiThemeProvider theme={muiRteTheme}>
                <MUIRichTextEditor
                  label="Type something here..."
                  defaultValue={textToMuiRteData(productState.description)}
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
                value={productState.price}
                type="number"
                labelWidth={60}
                required
                endAdornment={
                  <InputAdornment position="end">đồng</InputAdornment>
                }
                name="price"
                onChange={handleTextChange}
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
                value={productState.cost}
                labelWidth={60}
                type="number"
                required
                name="cost"
                onChange={handleTextChange}
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
                value={productState.quantity}
                labelWidth={60}
                type="number"
                required
                name="quantity"
                onChange={handleTextChange}
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
                      checked={productState.isManageVariant}
                      onChange={handleCheckboxChange}
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
        <Box mt={2} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ProductVariant variant={productState} />
          </Grid>
        </Grid>
      </CardContent>
      <Box mt={3} />
      <Divider />
      <CardActions>
        <Button color="primary" variant="contained">
          Cập nhật
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductInfo;
