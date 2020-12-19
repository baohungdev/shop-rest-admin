import React from 'react';
import {
  Paper,
  Grid,
  Box,
  TextField,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography
} from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as newProductDetailActions
} from 'src/views/product/NewProductDetailView/redux';

const options = [
  {
    icon: DeleteIcon,
    action: 'deleteVariant',
    text: 'Xoá'
  }
];

const ITEM_HEIGHT = 48;

const ProductVariant = ({ actions, variant }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = ({ action, payload }) => {
    actions[action](payload);
  };

  return (
    <Paper>
      <Grid container>
        <Grid item xs={12}>
          <Box display="flex" flexDirection="row-reverse">
            <IconButton
              aria-label="display more actions"
              color="inherit"
              onClick={handleClick}
            >
              <MoreIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch'
                }
              }}
            >
              {options.map(option => {
                const Component = option.icon;
                return (
                  <MenuItem
                    key={option}
                    onClick={e =>
                      handleMenuItemClick({
                        action: option.action,
                        payload: { id: variant.id }
                      })
                    }
                  >
                    <ListItemIcon>
                      <Component />
                    </ListItemIcon>
                    <Typography variant="inherit" noWrap>
                      {option.text}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box padding={3}>
            <TextField
              label="Tên biến thể"
              value={variant.name}
              onChange={e =>
                actions.changeVariantProperty({
                  id: variant.id,
                  property: 'name',
                  value: e.target.value
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box padding={3}>
            <TextField
              label="Giá bán"
              value={variant.price}
              onChange={e =>
                actions.changeVariantProperty({
                  id: variant.id,
                  property: 'price',
                  value: Number(e.target.value)
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box padding={3}>
            <TextField
              label="Giá vốn"
              value={variant.cost}
              onChange={e =>
                actions.changeVariantProperty({
                  id: variant.id,
                  property: 'cost',
                  value: Number(e.target.value)
                })
              }
            />
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box padding={3}>
            <TextField
              label="Số lượng"
              value={variant.quantity}
              onChange={e =>
                actions.changeVariantProperty({
                  id: variant.id,
                  property: 'quantity',
                  value: Number(e.target.value)
                })
              }
            />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...newProductDetailActions };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductVariant);
