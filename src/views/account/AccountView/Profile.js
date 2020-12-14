import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Image } from '@material-ui/icons';
import { DropzoneDialog } from 'material-ui-dropzone';

import * as accountActions from 'src/views/account/AccountView/redux/actions';
import { name } from 'src/views/account/AccountView/redux';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, userInfo, actions, ...rest }) => {
  const classes = useStyles();
  const [isOpenModalUpload, setOpenModalUpload] = useState(false);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText={'Đóng'}
          submitButtonText={'Cập nhật'}
          maxFileSize={5000000}
          open={isOpenModalUpload}
          onClose={() => setOpenModalUpload(false)}
          onSave={files => {
            setOpenModalUpload(false);
            actions.uploadImage(files[0]);
          }}
          showPreviews={true}
          showFileNamesInPreview={true}
          Icon={Image}
          dialogTitle={'Cập nhật ảnh đại diện'}
          dropzoneText={
            'Kéo và thả hình hoặc bấm vào ô bên dưới để chọn ảnh của bạn'
          }
          fullWidth={true}
          filesLimit={1}
        />

        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={userInfo.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userInfo.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {`${userInfo.email} ${userInfo.roles}`}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${moment(userInfo.birthDate).format('l')}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={null}
          onClick={() => setOpenModalUpload(true)}
        >
          Cập nhật ảnh đại diện
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

const mapStateToProps = state => {
  return {
    ...state[name]
  };
};

const mapDispatchToProps = dispatch => {
  const actions = {
    ...accountActions
  };
  return {
    actions: bindActionCreators(actions, dispatch)
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Profile)
);
