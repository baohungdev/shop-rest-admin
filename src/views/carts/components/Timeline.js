import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { name, actions as cartActions } from 'src/views/carts/redux';
import { toTimeLine } from 'src/views/carts/utils/mapStatusCodeToText';
import _reverse from 'lodash/reverse';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: '6px 16px'
  },
  secondaryTail: {
    backgroundColor: theme.palette.secondary.main
  }
}));

const CustomizedTimeline = ({ singleCart }) => {
  const classes = useStyles();
  const logs = (singleCart.logs || []).slice(0).reverse();

  return (
    <Timeline align="alternate">
      {logs.map(log => {
        const style = toTimeLine(log.status);
        const { Icon } = style;

        return (
          <TimelineItem>
            <TimelineOppositeContent>
              <Typography variant="body2" color="textSecondary">
                {moment(log.createdAt).format('L')}
              </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                style={{
                  backgroundColor: style.backgroundColor,
                  color: '#fff'
                }}
              >
                <Icon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Paper elevation={3} className={classes.paper}>
                <Typography variant="h6" component="h1">
                  {style.label}
                </Typography>
                <Typography>{`Đơn hàng đã được cập nhật sang trạng thái ${style.label}`}</Typography>
              </Paper>
            </TimelineContent>
          </TimelineItem>
        );
      })}
    </Timeline>
  );
};

const mapStateToProps = state => {
  return { ...state[name] };
};

const mapDispatchToProps = dispatch => {
  const actions = { ...cartActions };

  return { actions: bindActionCreators(actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomizedTimeline);
