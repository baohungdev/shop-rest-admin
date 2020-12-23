import React from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  List,
  Box,
  ListItem,
  makeStyles,
  Collapse
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NavItem from './NavItem';

const useStyles = makeStyles(theme => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));

const NavItemCollapse = ({ className, item }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const Icon = item.icon;

  return (
    <React.Fragment>
      <Button
        className={classes.button}
        component={RouterLink}
        to={item.href || '#'}
        onClick={() => setOpen(!open)}
      >
        {Icon && <Icon className={classes.icon} size="20" />}
        <span className={classes.title}>{item.title}</span>
        <ExpandMoreIcon className={classes.icon} size="20" />
      </Button>
      <Collapse component={'div'} in={open}>
        <List>
          {item.children.map(child => {
            const Icon = child.icon;

            return (
              <ListItem
                className={clsx(classes.item, className)}
                disableGutters
              >
                <Button
                  activeClassName={classes.active}
                  className={classes.button}
                  component={RouterLink}
                  to={child.href}
                >
                  <Box ml={1}>
                    {Icon && <Icon className={classes.icon} size="20" />}
                    <span className={classes.title}>{child.title}</span>
                  </Box>
                </Button>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </React.Fragment>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItemCollapse;
