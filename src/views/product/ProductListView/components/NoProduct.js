import React from 'react';
import {
  Grid,
  Page,
  Container,
  Typography,
  Box,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 150
  }
}));

const NoProduct = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container>
      <Grid item xs={12}>
        <Box
          display="flex"
          flexDirection="column"
          height="100%"
          justifyContent="center"
          mt={5}
        >
          <Container maxWidth="md">
            <Typography align="center" color="textPrimary" variant="h3">
              Không có thông tin sản phẩm
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              Hãy thử tìm kiếm hoặc tạo sản phẩm mới
            </Typography>
            <Box textAlign="center">
              <img
                alt="Under development"
                className={classes.image}
                src="/static/images/products/no_product.svg"
              />
            </Box>
          </Container>
        </Box>
      </Grid>
    </Grid>
  );
};

export default NoProduct;
