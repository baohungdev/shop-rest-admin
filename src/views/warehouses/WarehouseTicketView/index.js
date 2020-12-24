import React, { useState } from 'react';
import Page from 'src/components/Page';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { FilePlus as FilePlusIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const WarehouseTicketView = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page className={classes.root} title="Phiếu Kho">
      <Container maxWidth={false}>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            variant="contained"
            onClick={null}
            startIcon={<FilePlusIcon />}
          >
            Tạo mới
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Phiếu nhập kho" />
              <Tab label="Phiếu xuất kho" />
            </Tabs>
          </Card>
        </Box>
        <Box mt={3}></Box>
      </Container>
    </Page>
  );
};

export default WarehouseTicketView;
