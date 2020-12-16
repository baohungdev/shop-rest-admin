import React, { useState } from 'react';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import {
  Card,
  CardMedia,
  Avatar,
  CardContent,
  Box,
  makeStyles,
  colors,
  ButtonBase,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  StarBorder as StarBorderIcon,
  AddAPhoto as AddAPhotoIcon,
  Delete as DeleteIcon
} from '@material-ui/icons';

import { Image as ImageIcon } from 'react-feather';

const productsImages = [];

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    flexWrap: 'nowrap',
    '&::-webkit-scrollbar': {
      width: 5
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      width: 2
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey'
    },
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  title: {
    color: theme.palette.primary.light
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  }
}));

const ProductImageList = ({ images }) => {
  const classes = useStyle();

  const NoImage = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 150,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box display="flex" justifyContent="center" mb={3}>
        <Avatar
          alt="Product"
          src={'https://img.icons8.com/dusk/64/000000/no-image.png'}
          variant="square"
        />
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h4">
        {'Sản phẩm chưa có hình ảnh'}
      </Typography>
    </div>
  );

  return (
    <Card>
      <CardContent>
        {_isEmpty(images) && <NoImage />}
        <div className={classes.root}>
          <GridList className={classes.gridList} cols={4}>
            {_map(images, (src, index) => (
              <GridListTile key={index}>
                <img src={src} alt={'hieu'} draggable={false} />
                <GridListTileBar
                  title={`Hình ${index}`}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title
                  }}
                  actionIcon={
                    <IconButton>
                      <DeleteIcon className={classes.title} />
                    </IconButton>
                  }
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductImageList;
