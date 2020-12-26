import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Page from 'src/components/Page';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SelectProduct from './components/SelectProduct';
import ProductList from './components/ProductList';
import ManufacturerCard from './components/ManufacturerCard';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  name,
  actions as warehouseTicketActions
} from 'src/views/warehouses/WarehouseTicketView/redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  cancelButton: {
    marginRight: theme.spacing(1)
  }
}));

const getSteps = () => {
  return ['Chọn sản phẩm/nhà cung cấp', 'Tạo phiếu kho', 'Hoàn tất'];
};

const NewWarehouseTicketView = ({
  actions,
  selectedWarehouseTransactionType,
  manufacturers
}) => {
  const classes = useStyles();
  const steps = getSteps();
  const pageTitle =
    selectedWarehouseTransactionType === 0
      ? 'Tạo phiếu nhập kho'
      : 'Tạo phiếu xuất kho';
  const history = useHistory();

  React.useEffect(
    () => () => {
      actions.clearNewData();
    },
    []
  );

  return (
    <Page className={classes.root} title={pageTitle}>
      <Container maxWidth={false}>
        <Box mt={3} display="flex" justifyContent="flex-end">
          <Button
            className={classes.cancelButton}
            onClick={e => history.push('/app/warehouses/tickets')}
          >
            Huỷ bỏ
          </Button>
          <Button color="primary" variant="contained">
            Lưu
          </Button>
        </Box>
        <Box mt={3} />
        <Box>
          <Stepper activeStep={0} alternativeLabel>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box mt={3} />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ManufacturerCard />
          </Grid>
          <Grid item xs={8}>
            <Card>
              <CardHeader title="Sản phẩm" />
              <Divider />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <SelectProduct />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <ProductList />
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
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
)(NewWarehouseTicketView);
