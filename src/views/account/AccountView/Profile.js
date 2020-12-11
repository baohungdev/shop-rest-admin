import React, { useEffect } from 'react';
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

import * as accountActions from 'src/views/account/AccountView/redux/actions';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, userInfo, actions, ...rest }) => {
  const classes = useStyles();

  useEffect(() => {
    actions.fetchUserInfo();
  }, [userInfo.name, userInfo.avatar, userInfo.email]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
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
            {`${moment().format('hh:mm A')} ${userInfo.birthDate}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
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
    ...state['Account']
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
