import React from 'react';
import { Paper, Grid, Typography, Box } from '@material-ui/core';

const ProductVariant = ({ actions, variant }) => {
  return (
    <Paper>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box padding={3}>
            <Typography>{variant.name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box padding={3}>
            <Typography variant="primary">{variant.price}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductVariant;
