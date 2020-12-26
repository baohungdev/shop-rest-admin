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
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';
import WarehouseTransactionTable from './components/WarehouseTransactionTable';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const WarehouseTicketView = ({
  actions,
  tableDisplay,
  selectedWarehouseTransactionType
}) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Page className={classes.root} title="Phiếu Kho">
      <Container maxWidth={false}>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            variant="contained"
            onClick={() => history.push('/app/warehouses/tickets/new')}
            startIcon={<FilePlusIcon />}
          >
            Tạo mới
          </Button>
        </Box>
        <Box mt={3}>
          <Card>
            <Tabs
              value={selectedWarehouseTransactionType}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, value) =>
                actions.changeTabDisplay({
                  type: value,
                  fetchParam: {
                    page: 0,
                    perpage: 10
                  }
                })
              }
            >
              <Tab label="Phiếu nhập kho" />
              <Tab label="Phiếu xuất kho" />
            </Tabs>
          </Card>
        </Box>
        <Box mt={3}></Box>
        <WarehouseTransactionTable />
      </Container>
    </Page>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...warehouseTicketActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WarehouseTicketView);
