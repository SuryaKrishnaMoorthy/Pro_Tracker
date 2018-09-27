import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { getOneTask, deleteOneStatus } from '../actions';

const mapStateToProps = ({ data }) => {
  return data;
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getOneTask, deleteOneStatus
}, dispatch);

class TaskView extends Component {

  componentDidMount() {
    this.props.getOneTask(this.props.navigation.getParam('id'));
  }

  statusCompleteTasks() {
    if (this.props.task.taskStatus) {
      return this.props.task.taskStatus.reduce((acc, status) => {
        acc[moment(status.task_date).format('YYYY-MM-DD')] = calendarCompleteStyle;
        return acc;
      }, {});
    }
    return {};
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: `${this.props.task.task_name}`,
            style: { color: '#fff', fontWeight: 'bold'
          } }}
          rightComponent={{
            icon: 'home',
            color: '#fff',
            onPress: () => navigation.navigate('Home')
          }}
        />
        <Calendar
          onDayPress={day => {
            console.log(this.props.task);

            const statusId = this.props.task.taskStatus.find(status =>
              moment(status.task_date).format('YYYY-MM-DD') === (day.dateString)).id;
            if (statusId) this.props.deleteOneStatus(this.props.task.id, statusId);
           }}
          minDate={moment(this.props.task.start_date).format('YYYY-MM-DD')}
          maxDate={moment(new Date()).format('YYYY-MM-DD')}
          markingType={'custom'}
          markedDates={this.statusCompleteTasks()}
          monthFormat={'MMMM, yyyy'}
          onMonthChange={month => {
            console.log('month changed', month);
          }}
          firstDay={1}
        />
        <View></View>
      </View>
    );
  }
}

const calendarCompleteStyle = {
    customStyles: {
      container: {
        backgroundColor: '#8AC53F',
      }
    }
  };


export default connect(mapStateToProps, mapDispatchToProps)(TaskView);
