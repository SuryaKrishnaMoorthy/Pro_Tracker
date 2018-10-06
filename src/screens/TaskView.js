import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Drawer } from 'native-base';
import { AccordionPro } from '../components';
import Sidebar from './Sidebar';
import { getOneTask, deleteOneStatus, createOneStatus } from '../actions';
import BarChartPro from '../components/BarChartPro';
import CircularProgressPro from '../components/CircularProgressPro';

const { RRule } = require('rrule');

const mapStateToProps = ({ data }) => {
  return data;
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getOneTask, deleteOneStatus, createOneStatus
}, dispatch);

class TaskView extends Component {

  componentDidMount() {
    this.props.getOneTask(this.props.navigation.getParam('id'));
  }

  calendarDateStatus() {
    const taskCompleteDates = this.props.task.taskStatus
      ? this.props.task.taskStatus.map(status =>
         moment(status.task_date).format('YYYY-MM-DD'))
      : '';
    const rRuleArr = RRule.fromString(this.props.task.r_rule).all();
    const today = moment(new Date()).format('YYYY-MM-DD');

    return rRuleArr.reduce((acc, dateStr) => {
      const date = moment(dateStr).format('YYYY-MM-DD');
      const diff = moment(date).diff(today);

      if (diff === 0) {
        if (taskCompleteDates.includes(date)) {
          acc[date] = styles.calendarCompleteStyle;
        } else {
          acc[date] = styles.calendarCurrentTaskStyle;
        }
      } else if (diff > 0) {
        acc[date] = styles.calendarFutureTaskStyle;
      } else if (diff < 0 && taskCompleteDates.includes(date)) {
        acc[date] = styles.calendarCompleteStyle;
      } else {
        acc[date] = styles.calendarInCompleteStyle;
      }
      return acc;
    }, {});
  }

  async toggleCompleteStatus(taskDate) {
    const statusObj = this.props.task.taskStatus.find(status =>
      moment(status.task_date).format('YYYY-MM-DD') === (taskDate));
    if (statusObj) {
      return await this.props.deleteOneStatus(this.props.task.id, statusObj.id);
    }
    const body = {
      task_id: this.props.task.id,
      task_date: taskDate,
      status: 'complete'
    };
    return this.props.createOneStatus(body);
  }

  closeDrawer = () => {
    if (this.drawer) this.drawer._root.close();
  };

  openDrawer = () => {
    if (this.drawer) this.drawer._root.open();
  };

  render() {
    const { navigation } = this.props;
    const dataArray = [
      { title: 'Progress', content: <CircularProgressPro style={{ width: '100%' }} /> },
      { title: 'Bar Chart', content: <BarChartPro style={{ width: '100%' }} /> },
    ];
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<Sidebar
          openDrawer={this.openDrawer}
          closeDrawer={this.closeDrawer}
          navigator={this.props.navigation}
        />}
        onClose={() => this.closeDrawer()}
      >
      <View>
        <Header
          backgroundColor='#43C6AC'
          leftComponent={{
            icon: 'menu',
            color: '#191654',
            onPress: () => this.openDrawer()
          }}
          centerComponent={{
            text: `${this.props.task.task_name}`,
            style: { color: '#191654', fontWeight: 'bold'
          } }}
          rightComponent={{
            icon: 'home',
            color: '#191654',
            onPress: () => navigation.navigate('HomeNavigator')
          }}
        />
        <Calendar
          onDayPress={day => {
            const taskDate = day.dateString;
            this.toggleCompleteStatus(taskDate);
           }}
          minDate={moment(this.props.task.start_date).format('YYYY-MM-DD')}
          maxDate={moment(new Date()).format('YYYY-MM-DD')}
          markingType={'custom'}
          markedDates={this.props.task.r_rule ? this.calendarDateStatus() : {}}
          monthFormat={'MMMM, yyyy'}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          firstDay={1}
        />
        <Text>
          {
            this.props.task.r_rule ? RRule.fromString(this.props.task.r_rule).toText() : ''}
        </Text>
      </View>
      <AccordionPro
        dataArray={dataArray}
        index={0}
      />
      {/* <BarChartPro /> */}
    </Drawer>
    );
  }
}

const styles = {
  calendarCompleteStyle: {
    customStyles: {
      container: {
        backgroundColor: '#8AC53F',
      }
    }
  },
  calendarInCompleteStyle: {
    customStyles: {
      container: {
        backgroundColor: '#FF5A5F',
      }
    },
  },
  calendarFutureTaskStyle: {
    customStyles: {
      container: {
        borderWidth: 0.5,
        borderColor: 'blue'
      }
    },
    disableTouchEvent: true
  },
  calendarCurrentTaskStyle: {
    customStyles: {
      container: {
        borderWidth: 0.5,
        borderColor: 'blue'
      }
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
