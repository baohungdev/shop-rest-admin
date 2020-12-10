import React from 'react';
import { bindActionCreators } from 'redux';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Snackbar
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Page from 'src/components/Page';
import { name, actions as viewActions } from './redux';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const LoginView = props => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Đăng nhập">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Snackbar
          open={props.snackbarOpen}
          autoHideDuration={6000}
          onClose={props.actions.closeSnackbar}
        >
          <MuiAlert
            severity={props.loginError ? 'error' : 'success'}
            elevation={6}
            onClose={props.actions.closeSnackbar}
            variant="filled"
          >
            {props.message}
          </MuiAlert>
        </Snackbar>
        <Container maxWidth="sm">
          <Formik
            initialValues={
              {
                // email: 'example@gmail.com',
                // password: 'Password123'
              }
            }
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Email không hợp lệ')
                .max(255)
                .required('Email bắt buộc'),
              password: Yup.string()
                .max(255)
                .required('Mật khẩu bắt buộc')
            })}
            onSubmit={(values, { setSubmitting }) => {
              props.actions.emailLogin({
                data: {
                  email: values.email,
                  password: values.password
                },
                updateStateOnFinish: [
                  () => {
                    setSubmitting(false);
                  }
                ]
              });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Đăng nhập
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sử dụng email và mật khẩu của bản
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Tài khoản đăng nhập"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Mật khẩu"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Tiếp tục
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

function mapStateToProps(state) {
  return {
    ...state[name]
  };
}
function mapDispatchToProps(dispatch) {
  const actions = {
    ...viewActions
  };
  return { actions: bindActionCreators(actions, dispatch) };
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginView)
);
