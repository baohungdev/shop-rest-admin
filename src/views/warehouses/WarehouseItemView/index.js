import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Result from './components/Result';
import WarehouseToolbar from './components/WarehouseToolbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const WarehouseItemView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Kho">
      <Container maxWidth={false}>
        <Box mt={3}>
          <WarehouseToolbar />
        </Box>
        <Box mt={3}>
          <Result />
        </Box>
      </Container>
    </Page>
  );
};

export default WarehouseItemView;
