import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Page from 'src/components/Page';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Box from '@material-ui/core/Box';
import HomeIcon from '@material-ui/icons/Home';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteIcon from '@material-ui/icons/Delete';
import _get from 'lodash/get';
import AlertDialog from 'src/components/AlertDialog';

import { name, actions as manufacturerAction } from '../redux';
import { CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  actionButton: {
    marginRight: theme.spacing(1)
  },
  productCard: {
    height: '100%'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff'
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20
  }
}));

const ManufacturerInfo = ({
  actions,
  pageTitle,
  usedFor,
  showWithFetchingId,
  newManufacturerInfo,
  updateManufacturerInfo,
  provinces,
  districts,
  wards,
  ...rest
}) => {
  const classes = useStyles();
  useEffect(() => {
    actions.getAllProvinces();

    if (usedFor === 'update') {
      actions.getDetailManufacturer({ manufacturerId: showWithFetchingId });
    }

    return () => {
      actions.showManufacturerInfo({
        show: false,
        usedFor: 'create',
        showWithFetchingId: null
      });
    };
  }, []);

  const [dialogOpen, setDialogOpen] = React.useState(false);

  const manufacturerInfo =
    usedFor === 'update' ? updateManufacturerInfo : newManufacturerInfo;

  return (
    <Page className={classes.root} title={pageTitle}>
      <Container maxWidth={false}>
        <AlertDialog
          open={dialogOpen}
          title="Xác nhận xóa nhà cung cấp"
          content="Đây là tác vụ không thể phục hồi, bạn có chắc muốn xóa nhà cung cấp này không?"
          aggreeText="Xóa"
          disagreeText="Hủy bỏ"
          onAgreeClick={() => {
            setDialogOpen(false);
            actions.deleteManufacturer({ manufacturerId: manufacturerInfo.id });
          }}
          onClose={() => {
            setDialogOpen(false);
          }}
        />
        <Backdrop
          className={classes.backdrop}
          open={rest.isSendingToServer || rest.isFetchingLocation}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {usedFor === 'update' && (
          <Box display="flex" justifyContent="flex-end" mb={3}>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => setDialogOpen(true)}
              startIcon={<DeleteIcon />}
            >
              Xóa nhà cung cấp
            </Button>
          </Box>
        )}
        <Box>
          <Card>
            <CardContent>
              <Breadcrumbs aria-label="breadcrumb">
                <Link
                  color="inherit"
                  onClick={() => actions.showManufacturerInfo(false)}
                  href="#"
                  className={classes.link}
                >
                  <HomeIcon className={classes.icon} />
                  Nhà cung cấp
                </Link>
                {usedFor === 'update' && (
                  <Link
                    color="textPrimary"
                    aria-current="page"
                    href="#"
                    className={classes.link}
                  >
                    {manufacturerInfo.id}
                  </Link>
                )}
                <Link
                  color="textPrimary"
                  aria-current="page"
                  href="#"
                  className={classes.link}
                >
                  {usedFor === 'update' ? 'Chi tiết' : 'Thêm mới'}
                </Link>
              </Breadcrumbs>
            </CardContent>
          </Card>
        </Box>
        <Box mt={3} />
        <Grid container>
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Thông tin nhà cung cấp"></CardHeader>
              <Divider />
              <CardContent>
                <form onSubmit={null}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        name="name"
                        variant="outlined"
                        value={manufacturerInfo.name}
                        label="Tên nhà cung cấp"
                        required
                        onChange={e =>
                          actions.changeManufacturerInfo({
                            name: e.target.name,
                            value: e.target.value,
                            usedFor
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        name="representative"
                        variant="outlined"
                        value={manufacturerInfo.representative}
                        label="Tên người đại diện"
                        required
                        onChange={e =>
                          actions.changeManufacturerInfo({
                            name: e.target.name,
                            value: e.target.value,
                            usedFor
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        name="email"
                        variant="outlined"
                        value={manufacturerInfo.email}
                        label="Email"
                        required
                        onChange={e =>
                          actions.changeManufacturerInfo({
                            name: e.target.name,
                            value: e.target.value,
                            usedFor
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        name="phone"
                        variant="outlined"
                        value={manufacturerInfo.phone}
                        label="Số điện thoại"
                        required
                        onChange={e =>
                          actions.changeManufacturerInfo({
                            name: e.target.name,
                            value: e.target.value,
                            usedFor
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        id="province"
                        value={rest.selectedProvinceId}
                        onChange={e => {
                          actions.getAllDistricts(e.target.value);
                        }}
                        variant="outlined"
                        fullWidth
                        label="Tỉnh thành"
                        disabled={rest.isFetchingLocation}
                      >
                        {provinces.map(p => (
                          <MenuItem value={p.id}>{p.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        id="district"
                        value={rest.selectedDistrictId}
                        onChange={e => actions.getAllWards(e.target.value)}
                        variant="outlined"
                        fullWidth
                        label="Quận huyện"
                        disabled={
                          rest.isFetchingLocation ||
                          rest.selectedProvinceId == null
                        }
                      >
                        {districts.map(d => (
                          <MenuItem value={d.id}>{d.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      <Select
                        id="ward"
                        value={rest.selectedWardId}
                        variant="outlined"
                        fullWidth
                        label="Phường xã"
                        disabled={
                          rest.isFetchingLocation ||
                          rest.selectedDistrictId == null
                        }
                        onChange={e => actions.changeWard(e.target.value)}
                      >
                        {wards.map(w => (
                          <MenuItem value={w.id}>{w.name}</MenuItem>
                        ))}
                      </Select>
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        fullWidth
                        name="address"
                        variant="outlined"
                        value={manufacturerInfo.address}
                        label="Địa chỉ"
                        required
                        onChange={e =>
                          actions.changeManufacturerInfo({
                            name: e.target.name,
                            value: e.target.value,
                            usedFor
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
              <Divider />
              <CardActions>
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="medium"
                    color="primary"
                    variant="contained"
                    className={classes.actionButton}
                    onClick={() =>
                      actions.saveOrUpdateManufacturer({
                        usedFor,
                        data: {
                          ...manufacturerInfo,
                          province: _get(
                            provinces.find(
                              p => p.id === rest.selectedProvinceId
                            ),
                            'name'
                          ),
                          ward: _get(
                            wards.find(p => p.id === rest.selectedWardId),
                            'name'
                          ),
                          district: _get(
                            districts.find(
                              p => p.id === rest.selectedDistrictId
                            ),
                            'name'
                          )
                        }
                      })
                    }
                  >
                    {usedFor === 'update' ? 'Cập nhật' : 'Thêm'}
                  </Button>
                  <Button
                    size="medium"
                    variant="contained"
                    className={classes.actionButton}
                    onClick={() => actions.showManufacturerInfo(false)}
                  >
                    Hủy bỏ
                  </Button>
                </Box>
              </CardActions>
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
  const actions = { ...manufacturerAction };
  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerInfo);
