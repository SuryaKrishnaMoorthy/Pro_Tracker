import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { Header, Input, Divider, ButtonGroup, Icon } from 'react-native-elements';
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
  OccurrenceCount,
  IconsPro } from '../components';
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
      task_type: 'personal',
      icon_name: '',
      icon_color: '#000000',
      icon_type: '',
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
      event_type: 'Single Event',
      start_date: moment(new Date()).format('YYYY-MM-DD'),
      end_date: moment(new Date()).format('YYYY-MM-DD'),
      occurrences: 0,
      byDay: '',
      pickerValue: '31',
      iconExpanded: false,
    };
  }

  onSubmit = () => {
    const {
      task_name,
      task_type,
      icon_name,
      icon_color,
      icon_type,
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
      task_type,
      icon_name,
      icon_color,
      icon_type,
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

  onTaskTypeChange = (value) => {
    this.setState({ task_type: value });
  }

  onEventTypeChange = (value) => {
    this.setState({ event_type: value });
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
    this.setState({ end_date, occurrences: 0 });
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

  expandIconView = () => {
    this.setState({ iconExpanded: !this.state.iconExpanded });
  }

  selectIcon = (icon_name, icon_type = '') => {
    this.setState({ icon_name, icon_type, iconExpanded: !this.state.iconExpanded });
  }

  selectColor = (icon_color) => {
    this.setState({ icon_color });
  }

  render() {
      const { navigation } = this.props;
      const chooseIcon = () =>
        <View style={styles.chooseIcon}>
          <View>
            <Text style={styles.chooseIconText}>Choose an icon: </Text>
          </View>
          <View>
            { this.state.icon_name && this.state.icon_color
              ?
              <Icon
                name={this.state.icon_name}
                color={this.state.icon_color}
                type={this.state.icon_type}
              />
              : ''
            }
          </View>
          <View>
            { !this.state.iconExpanded
              ?
              <Icon
                name='expand-more'
              />
              :
              <Icon
                name='expand-less'
              />
            }
          </View>
        </View>;

      return (
        <View>
          <Header
            backgroundColor='#43C6AC'
            leftComponent={{
              icon: 'chevron-left',
              color: '#191654',
              onPress: () => navigation.navigate('AddTask')
            }}
            centerComponent={{
              text: 'Let\'s get your task created!',
              style: { color: '#191654', fontWeight: 'bold' }
            }}
            rightComponent={{
              icon: 'done',
              color: '#191654',
              onPress: () => {
                this.onSubmit();
                navigation.navigate('HomeNavigator');
              }
            }}
          />
          <ScrollView style={{ height: '100%' }}>
            <Input
              placeholder='Write your task...'
              leftIcon={{ type: 'font-awesome', name: 'pencil' }}
              inputStyle={styles.input}
              value={this.state.task_name}
              onChangeText={this.onInputChange}
            />
            <ButtonGroupPro
              buttonValues={['Personal', 'Professional']}
              onButtonValueChange={this.onTaskTypeChange}
            />
            <ButtonGroup
              buttons={[{ element: chooseIcon }]}
              containerStyle={{ backgroundColor: '#43C6AC' }}
              onPress={this.expandIconView}
            />
            { this.state.iconExpanded
              ?
              <IconsPro
                icon_color={this.state.icon_color}
                selectIcon={this.selectIcon}
                selectColor={this.selectColor}
              />
              : ''
            }
            <View>
              <TimePicker
                updateTime={this.updateTime}
              />
            </View>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <View>
              <ButtonGroupPro
                buttonValues={['Single Event', 'Repeated Events']}
                onButtonValueChange={this.onEventTypeChange}
              />
            </View>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            { this.state.event_type === 'Repeated Events'
              ?
                (<View>
                  <View>
                    <RadioButtonPro
                      radioProps={this.state.radioProps}
                      updateFrequency={this.updateFrequency}
                    />
                  </View>
                  <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                  { this.state.frequency === 'DAILY'
                    ?
                      (<View>
                        <IntervalInput
                          frequency={this.state.frequency}
                          dailyRecur={this.state.interval}
                          updateInterval={this.updateInterval}
                        />
                      </View>)
                    : ''
                  }
                  { this.state.frequency === 'WEEKLY'
                    ?
                      (<View>
                        <View>
                          <CheckBoxPro updateByDay={this.updateByDay} />
                        </View>
                        <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                        <IntervalInput
                          frequency={this.state.frequency}
                          dailyRecur={this.state.interval}
                          updateInterval={this.updateInterval}
                        />
                      </View>)
                    : ''
                  }
                  { this.state.frequency === 'MONTHLY'
                    ?
                      (<View flex center>
                        <View style={styles.monthlyStyle}>
                          <View style={styles.recurTextStyle}>
                            <Text style={styles.textStyle}>Recur</Text>
                          </View>
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
                      </View>)
                    : ''
                  }
                  <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                </View>)
              : ''
            }
            <View>
              <DatePickerPro
                dateType={'start'}
                dateText={'Start Date'}
                updateDate={this.updateStartDate}
              />
            </View>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
            <View>
              { this.state.event_type === 'Repeated Events'
                ?
                <View>
                  <View>
                    <OccurrenceCount
                      updateOccurrences={this.updateOccurrences}
                    />
                  </View>
                  <View style={styles.recurTextStyle}>
                    <Text style={styles.endTextStyle}>
                      --------OR--------
                    </Text>
                  </View>
                </View>
                : ''
              }
              <DatePickerPro
                dateType={'end'}
                dateText={'End Date'}
                updateDate={this.updateEndDate}
              />
            </View>
            <Divider style={{ marginTop: 10, marginBottom: 10 }} />
          </ScrollView>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  input: {
    margin: 5,
    color: '#191654'
  },
  textStyle: {
    color: '#191654',
    fontWeight: 'bold'
  },
  monthlyContainerStyle: {
    justifyContent: 'center'
  },
  monthlyStyle: {
    width: 200,
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  recurTextStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  endTextStyle: {
    color: '#191654',
    fontWeight: 'bold',
    marginTop: 20
  },
  chooseIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center'
  },
  chooseIconText: {
    color: '#191654',
    fontSize: 14.95,
    fontWeight: '500'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
