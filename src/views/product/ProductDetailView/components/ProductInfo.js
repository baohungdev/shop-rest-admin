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

import textToMuiRteData from 'src/utils/textToMuiRteData';

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

const ProductInfo = ({ product }) => {
  return (
    <Card>
      <CardHeader title="Thông tin sản phẩm"></CardHeader>
      <Divider />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              value={product.name}
              label="Tên sản phẩm"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <MuiThemeProvider theme={muiRteTheme}>
                <MUIRichTextEditor
                  label="Type something here..."
                  defaultValue={textToMuiRteData(product.description)}
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
                labelWidth={60}
                required
                endAdornment={
                  <InputAdornment position="end">đồng</InputAdornment>
                }
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
                required
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
                required
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
                      checked={true}
                      onChange={null}
                      name="variant"
                      color="primary"
                    />
                  }
                  label="Sản phẩm có biến thể"
                />
              </FormGroup>
            </FormControl>
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
