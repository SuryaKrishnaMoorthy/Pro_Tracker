import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header, Input, Icon, Divider } from 'react-native-elements';
import moment from 'moment';

import pickerValues from '../helpers/data';
import {
  IntervalInput,
  ButtonGroupPro,
  RadioButtonPro,
  CheckBoxPro,
  TimePicker,
  DatePickerPro,
  PickerPro,
  OccurrenceCount
} from '../components';
import { createOneTask } from '../actions';

const { RRule } = require('rrule');

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
      task_name: this.props.navigation.getParam('task_name'),
      radioProps: [
        { label: 'Daily', value: 'DAILY' },
        { label: 'Weekly', value: 'WEEKLY' },
        { label: 'Monthly', value: 'MONTHLY' }
        //, { label: 'Yearly', value: 'YEARLY' }
      ],
      frequency: 'DAILY',
      interval: 1,
      start_time: `${moment(new Date()).format('HH:mm')}`,
      end_time: `${moment(new Date()).add(30, 'minutes').format('HH:mm')}`,
      start_date: moment(new Date()).format('YYYY-MM-DD'),
      end_date: moment(new Date()).format('YYYY-MM-DD'),
      occurrences: 0,
      byDay: '',
      pickerValue: '31'
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
      end_date,
      occurrences,
      byDay,
      pickerValue
    } = this.state;

    const sRruleTime = moment(start_time, 'HH:mm').format('HHmmss');
    const eRruleTime = moment(end_time, 'HH:mm').format('HHmmss');
    const sRruleDate = moment(start_date).format('YYYYMMDD');
    const eRruleDate = moment(end_date).format('YYYYMMDD');

    let r_rule =
     `DTSTART:${sRruleDate}T${sRruleTime}Z\n` +
     `RRULE:FREQ=${frequency};INTERVAL=${interval};`;
    if (frequency === 'MONTHLY') {
      if (isNaN(pickerValue)) {
        r_rule = `${r_rule}BYDAY=${pickerValue};`;
      } else {
        r_rule = `${r_rule}BYMONTHDAY=${parseInt(pickerValue, 10)};`;
      }
    } else {
      r_rule = byDay !== '' ? (`${r_rule}BYDAY=${byDay};`) : r_rule;
    }
    r_rule = occurrences > 0 ? (`${r_rule}COUNT=${occurrences}`)
    : (`${r_rule}UNTIL=${eRruleDate}T${eRruleTime}Z`);

    const rRuleSize = RRule.fromString(r_rule).all().length;

    const body = {
      task_name,
      task_type: 'personal',
      location: '',
      status: 'created',
      r_rule,
      start_date,
      end_date,
      start_time,
      end_time,
      total_score: rRuleSize * 100,
      current_score: 0
    };
    this.props.createOneTask(body);
  }

  onInputChange = (text) => {
    this.setState({ task_name: text });
  }

  updateFrequency = (frequency) => {
    this.setState({
      frequency,
      interval: 1,
      byDay: ''
    });
  }

  updateInterval = (interval) => {
    this.setState({ interval });
  }

  updateTime = (start_time, end_time) => {
    this.setState({ start_time, end_time });
  }

  updateStartDate = (start_date) => {
    this.setState({ start_date });
  }

  updateEndDate = (end_date) => {
    this.setState({ end_date });
  }

  updateOccurrences = (occurrences) => {
    this.setState({ occurrences });
  }

  updateByDay = (byDay) => {
    this.setState({ byDay });
  }

  pickerValueChange = (pickerValue) => {
    this.setState({ pickerValue });
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
                navigation.navigate('HomeNavigator');
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
          (<View>
            <View style={styles.checkboxContainer}>
              <CheckBoxPro updateByDay={this.updateByDay} />
            </View>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <IntervalInput
              frequency={this.state.frequency}
              dailyRecur={this.state.interval}
              updateInterval={this.updateInterval}
            />
          </View>) : ''
          }
          { this.state.frequency === 'MONTHLY' ?
            (<View>
              <View>
                <PickerPro
                  pickerValues={pickerValues}
                  pickerValueChange={this.pickerValueChange}
                />
                <IntervalInput
                  frequency={this.state.frequency}
                  dailyRecur={this.state.interval}
                  updateInterval={this.updateInterval}
                />
              </View>
            </View>) : ''
          }
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <DatePickerPro
              dateType={'start'}
              dateText={'Start Date'}
              updateDate={this.updateStartDate}
            />
          </View>
          <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <OccurrenceCount
              updateOccurrences={this.updateOccurrences}
            />
            <DatePickerPro
              dateType={'end'}
              dateText={'End Date'}
              updateDate={this.updateEndDate}
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
