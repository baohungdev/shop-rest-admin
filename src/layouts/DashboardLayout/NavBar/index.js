import React, { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Package as PackageIcon,
  Truck as TruckIcon,
  Shield as ShieldIcon,
  Database as DatabaseIcon,
  FileText as FileTextIcon
} from 'react-feather';
import NavItem from './NavItem';
import NavItemCollapse from './NavItemCollapse';

const items = [
  {
    type: 'simple',
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Tổng quan'
  },
  {
    type: 'simple',
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Khách hàng'
  },
  {
    type: 'simple',
    href: '/app/products',
    icon: PackageIcon,
    title: 'Sản phẩm'
  },
  {
    type: 'collapse',
    // href: '/app/warehouse',
    icon: TruckIcon,
    title: 'Kho hàng',
    children: [
      {
        type: 'simple',
        href: '/app/warehouse/items',
        icon: DatabaseIcon,
        title: 'Mục kho'
      },
      {
        type: 'simple',
        icon: FileTextIcon,
        href: '/app/warehouse/tickets',
        title: 'Phiếu kho'
      }
    ]
  },
  {
    type: 'simple',
    href: '/app/basket',
    icon: ShoppingBagIcon,
    title: 'Đơn hàng'
  },
  {
    type: 'simple',
    href: '/app/admin',
    icon: ShieldIcon,
    title: 'Nâng cao'
  },
  {
    type: 'simple',
    href: '/app/account',
    icon: UserIcon,
    title: 'Tài khoản'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile, userInfo }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={userInfo.avatar}
          to="/app/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {userInfo.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {userInfo.email}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item =>
            item.type === 'simple' ? (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ) : (
              <NavItemCollapse item={item} />
            )
          )}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

const mapStateToProps = state => {
  return {
    ...state['Login']
  };
};

export default withRouter(connect(mapStateToProps)(NavBar));
