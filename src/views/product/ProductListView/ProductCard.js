import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import _get from 'lodash/get';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Chip,
  Button
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import { green, red, blue } from '@material-ui/core/colors';

import {
  Tag as TagIcon,
  EyeOff as EyeOffIcon,
  ShoppingCart as ShoppingCartIcon
} from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const BlueButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(blue[500]),
    backgroundColor: blue[500],
    '&:hover': {
      backgroundColor: blue[700]
    }
  }
}))(Button);

const RedButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700]
    }
  }
}))(Button);

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  const statusToText = status => {
    if (status == 0) return { icon: EyeOffIcon, text: 'Ẩn' };
    if (status == 1) return { icon: ShoppingCartIcon, text: 'Đang bán' };
  };

  const status = statusToText(product.status);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            alt="Product"
            src={_get(product, 'imageUrls.0')}
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          {product.description}
        </Typography>
      </CardContent>
      <Box flexGrow={1} padding={1}>
        <Chip
          icon={<TagIcon scale={0.5} />}
          color="primary"
          variant="default"
          label={product.categoryText}
          size="small"
          variant="outlined"
        />
        <Chip
          icon={<status.icon />}
          color="default"
          variant="default"
          label={status.text}
          size="small"
          variant="outlined"
        />
      </Box>
      <Divider />
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item></Grid>
          <Grid className={classes.statsItem} item>
            <BlueButton variant="contained" color="primary">
              <Typography color="inherit" display="inline" variant="body2">
                Cập nhật
              </Typography>
            </BlueButton>
            <Box m={1} />
            <RedButton variant="contained" color="primary">
              <Typography color="inherit" display="inline" variant="body2">
                Xóa
              </Typography>
            </RedButton>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired
};

export default ProductCard;
