import React from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './components/Results';
import Toolbar from './components/Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ManufacturerListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Nhà cung cấp">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Page>
  );
};

export default ManufacturerListView;
