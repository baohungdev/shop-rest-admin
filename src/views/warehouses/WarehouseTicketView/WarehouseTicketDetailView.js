import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Page from 'src/components/Page';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
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
import CheckIcon from '@material-ui/icons/Check';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import getSteps from './utils/getSteps';
import SelectProduct from './components/SelectProduct';
import ProductList from './components/ProductList';
import ManufacturerCard from './components/ManufacturerCard';
import { bindActionCreators } from 'redux';
import AlertDialog from 'src/components/AlertDialog';
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  cancelButton: {
    marginRight: theme.spacing(1)
  }
}));

const WarehouseTicketDetailView = ({
  actions,
  warehouseTransaction,
  ...rest
}) => {
  const queries = new URLSearchParams(useLocation().search);
  const transactionId = queries.get('id') || null;
  const [openConfirmDeleteDialog, setOpenConfirmDeleteDialog] = useState(false);
  const classes = useStyles();
  const steps = getSteps();
  const pageTitle =
    warehouseTransaction.transactionType === 0
      ? 'Chi tiết phiếu nhập kho'
      : 'Chi tiết phiếu xuất kho';
  const history = useHistory();

  React.useEffect(() => {
    actions.fetchDetailWarehouseTransaction({ id: transactionId });
  }, []);

  const activeStep = [1, 2].includes(warehouseTransaction.status) ? 2 : 1;
  const displayToolbar = ![1, 2].includes(warehouseTransaction.status);

  return (
    <Page className={classes.root} title={pageTitle}>
      <Container maxWidth={false}>
        <AlertDialog
          open={openConfirmDeleteDialog}
          title="Xác nhận xóa phiếu kho?"
          content="Đây là tác vụ không thể phục hồi, bạn có chắc muốn xóa phiếu kho này không?"
          aggreeText="Xóa"
          disagreeText="Hủy bỏ"
          onAgreeClick={() => {
            setOpenConfirmDeleteDialog(false);
            actions.cancelWarehouseTransaction({ id: transactionId });
          }}
          onClose={() => {
            setOpenConfirmDeleteDialog(false);
          }}
        />
        <Backdrop className={classes.backdrop} open={rest.isSendingToServer}>
          <CircularProgress color="inherit" />
        </Backdrop>
        {displayToolbar && (
          <Box mt={3} display="flex" justifyContent="flex-end">
            <Button
              className={classes.cancelButton}
              onClick={() => setOpenConfirmDeleteDialog(true)}
            >
              Huỷ phiếu
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<CheckIcon />}
              onClick={() => {
                actions.confirmWarehouseTransaction({ id: transactionId });
              }}
            >
              Xác nhận
            </Button>
          </Box>
        )}
        <Box mt={3} />
        <Box>
          <Stepper activeStep={activeStep} alternativeLabel>
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
            {warehouseTransaction.transactionType === 0 && (
              <ManufacturerCard view={true} />
            )}
          </Grid>
          <Grid item xs={warehouseTransaction.transactionType === 0 ? 8 : 12}>
            <Card>
              <CardHeader title="Sản phẩm" />
              <Divider />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <SelectProduct view={true} />
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <ProductList view={true} />
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
)(WarehouseTicketDetailView);
