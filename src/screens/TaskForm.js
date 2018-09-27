import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header, Input, Icon, Divider } from 'react-native-elements';
import moment from 'moment';
import {
  IntervalInput,
  ButtonGroupPro,
  RadioButtonPro,
  CheckBoxPro,
  TimePicker,
  DatePickerPro
} from '../components';
import { createOneTask } from '../actions';

const mapStateToProps = ({ data }) => {
  return data;
};

const mapDispatchToProps = dispatch => bindActionCreators({
  createOneTask
}, dispatch);

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_name: '',
      checked: false,
      radioProps: [
        { label: 'Daily', value: 'DAILY' },
        { label: 'Weekly', value: 'WEEKLY' },
        { label: 'Monthly', value: 'MONTHLY' },
        { label: 'Yearly', value: 'YEARLY' }
      ],
      endaDateOptions: [
        { label: 'No end date', value: 1 },
        { label: 'End after 10 occurrences', value: 2 },
        { label: 'End date', value: 3 }
      ],
      frequency: 'DAILY',
      interval: 1,
      start_time: `${new Date().getHours()}:${new Date().getMinutes()}`,
      end_time: `${new Date().getHours()}:` +
      `${new Date().getMinutes() + (new Date().getMinutes() * 60000)}`,
      start_date: moment(new Date()).format('YYYY-MM-DD'),
      end_date: moment(new Date()).format('YYYY-MM-DD'),
    };
  }

  onSubmit = () => {
    const {
      task_name,
      frequency,
      interval,
      start_time,
      end_time,
      start_date,
      end_date
    } = this.state;
    const sRruleTime = moment(start_time, 'HH:mm').format('HHmmss');
    const eRruleTime = moment(end_time, 'HH:mm').format('HHmmss');
    const sRruleDate = moment(start_date).format('YYYYMMDD');
    const eRruleDate = moment(end_date).format('YYYYMMDD');
    const r_rule =
     `DTSTART:${sRruleDate}T${sRruleTime}Z\n` +
     `RRULE:FREQ=${frequency};INTERVAL=${interval};UNTIL=${eRruleDate}T${eRruleTime}Z`;
    const body = {
      task_name,
      task_type: 'personal',
      location: '95050',
      status: 'created',
      r_rule,
      start_date,
      end_date,
      start_time,
      end_time,
      total_score: 1000,
      current_score: 0
    };
    console.log(body);
    //this.props.createOneTask(body);
  }

  onInputChange = (text) => {
    this.setState({ task_name: text });
  }

  updateFrequency = (frequency) => {
    this.setState({ frequency });
  }

  updateInterval = (interval) => {
    this.setState({ interval });
  }

  updateTime = (start_time, end_time) => {
    this.setState({ start_time, end_time });
  }

  updateDate = (start_date, end_date) => {
    this.setState({ start_date, end_date });
  }

  render() {
      const { navigation } = this.props;

      return (
        <ScrollView>
          <Header
            leftComponent={{
              icon: 'chevron-left',
              color: '#fff',
              onPress: () => navigation.navigate('AddTask')
            }}
            centerComponent={{
              text: 'Let\'s get your task created!',
              style: { color: '#fff', fontWeight: 'bold' }
            }}
            rightComponent={{
              icon: 'done',
              color: '#fff',
              onPress: () => {
                this.onSubmit();
                navigation.navigate('Home');
              }
            }}
          />
          <Input
            placeholder='Write your task...'
            leftIcon={{ type: 'font-awesome', name: 'pencil' }}
            value={this.state.task_name}
            onChangeText={this.onInputChange}
          />
          <ButtonGroupPro />
          <Text>
            Choose an icon:
            <Icon
              name='chevron-circle-down'
              type='font-awesome'
              onPress={() => console.log('hello')}
            />
          </Text>
          <View>
            <TimePicker
              updateTime={this.updateTime}
            />
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <View>
            <RadioButtonPro
              radioProps={this.state.radioProps}
              updateFrequency={this.updateFrequency}
            />
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          { this.state.frequency === 'DAILY' ?
          (<View>
            <IntervalInput
              frequency={this.state.frequency}
              dailyRecur={this.state.interval}
              updateInterval={this.updateInterval}
            />
          </View>) : ''
          }
          { this.state.frequency === 'WEEKLY' ?
          (<View style={styles.checkboxContainer}>
            <CheckBoxPro />
          </View>) : ''
          }
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <DatePickerPro
              updateDate={this.updateDate}
            />
          </View>
        </ScrollView>
      );
    }
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    overflow: 'scroll',
    justifyContent: 'space-between'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
