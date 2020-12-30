import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Typography';

const Logo = props => {
  return (
    <div
      id="avatar"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Avatar
        src="/static/logo.svg"
        variant="square"
        style={{ width: '52px' }}
      />
    </div>
  );
};

export default Logo;
