import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
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

const ProductCard = ({ className, product, ...rest }) => {
  const classes = useStyles();

  const history = useHistory();

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
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                history.push(`${history.location.pathname}/view/${product.id}`)
              }
            >
              <Typography color="inherit" display="inline" variant="body2">
                Cập nhật
              </Typography>
            </Button>
            <Box m={1} />
            <Button variant="contained" color="secondary">
              <Typography color="inherit" display="inline" variant="body2">
                Xóa
              </Typography>
            </Button>
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
