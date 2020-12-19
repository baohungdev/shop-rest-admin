import React from 'react';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Chip,
  Button,
  IconButton
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const SkeletonProductCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" justifyContent="center" mb={3}>
          <Skeleton animation="wave" variant="rect" height={40} weight={40} />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          <Skeleton animation="wave" />
        </Typography>
        <Typography align="center" color="textPrimary" variant="body1">
          <Box display="flex" justifyContent="center">
            <Skeleton animation="wave" width={100} />
          </Box>
        </Typography>
      </CardContent>
      <Box padding={1}>
        <Grid spacing={1} container justify="center">
          <Grid item>
            <Skeleton animation="wave" width={50} height={20} />
          </Grid>
          <Grid item>
            <Skeleton animation="wave" width={50} height={20} />
          </Grid>
        </Grid>
      </Box>
      <Box p={2}>
        <Grid container justify="space-between" spacing={2}>
          <Grid className={classes.statsItem} item></Grid>
          <Grid className={classes.statsItem} item></Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default SkeletonProductCard;
