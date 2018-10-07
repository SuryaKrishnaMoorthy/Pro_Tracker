import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Header, Input, Icon, Divider, ButtonGroup } from 'react-native-elements';
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
  IconsPro
} from '../components';
import { updateOneTask } from '../actions';

const { RRule } = require('rrule');

const mapStateToProps = ({ data }) => {
  return data;
};

const mapDispatchToProps = dispatch => bindActionCreators({
  updateOneTask
}, dispatch);

class EditTaskForm extends Component {
  constructor(props) {
    super(props);
    const task = this.props.navigation.getParam('task');
    const rRuleString = task.r_rule.split('\n')[1].split(':')[1].split(';');
    const rRuleObj = rRuleString.reduce((obj, val) => {
      obj[val.split('=')[0].toLowerCase()] = val.split('=')[1];
      return obj;
    }, {});

    this.state = {
      radioProps: [
        { label: 'Daily', value: 'DAILY' },
        { label: 'Weekly', value: 'WEEKLY' },
        { label: 'Monthly', value: 'MONTHLY' }
        //, { label: 'Yearly', value: 'YEARLY' }
      ],
      frequency: rRuleObj.freq,
      interval: rRuleObj.interval || 1,
      occurrences: rRuleObj.count || 0,
      byDay: rRuleObj.byday || '',
      pickerValue: (rRuleObj.freq === 'MONTHLY')
      ? (rRuleObj.byDay ? rRuleObj.byDay : rRuleObj.byMonthDay)
      : '31',
      iconExpanded: false,
      ...task,
    };
  }

  onSubmit = () => {
    const {
      id,
      task_name,
      task_type,
      frequency,
      interval,
      start_time,
      end_time,
      start_date,
      end_date,
      occurrences,
      byDay,
      pickerValue,
      icon_name,
      icon_color,
      icon_type,
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
    const taskStatusDates = this.state.taskStatus.map(status => status.task_date);
    const rRuleDates = RRule.fromString(r_rule).all()
      .map(date => moment(date).format('YYYY-MM-DD'));

    const body = {
      task_name,
      task_type,
      location: '',
      status: 'updated',
      r_rule,
      start_date,
      end_date,
      start_time,
      end_time,
      total_score: rRuleSize * 100,
      current_score: this.intersect(taskStatusDates, rRuleDates).length * 100,
      icon_name,
      icon_color,
      icon_type,
    };
    this.props.updateOneTask(id, body);
  }

  onInputChange = (text) => {
    this.setState({ task_name: text });
  }

  onTaskTypeChange = (value) => {
    this.setState({ task_type: value });
    console.log(this.state);
  }

  onEventTypeChange = (value) => {
    this.setState({ event_type: value });
  }

  intersect = (a, b) => {
    let temp;
    if (b.length > a.length) {
      temp = b;
      b = a;
      a = temp;
    }
    return a.filter(e => b.indexOf(e) > -1);
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
            color: '#fff',
            onPress: () => navigation.navigate('HomeNavigator')
          }}
          centerComponent={{
            text: `Edit ${this.state.task_name}`,
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
              selectedStartTime={this.state.start_time}
              selectedEndTime={this.state.end_time}
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
                    selectedFrequency={
                      this.state.radioProps
                      .findIndex(obj => obj.value === this.state.frequency)
                    }
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
                        selectedInterval={this.state.interval}
                      />
                    </View>)
                  : ''
                }
                { this.state.frequency === 'WEEKLY'
                  ?
                    (<View>
                      <View>
                        <CheckBoxPro
                          updateByDay={this.updateByDay}
                          selectedDays={this.state.byDay}
                        />
                      </View>
                      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
                      <IntervalInput
                        frequency={this.state.frequency}
                        dailyRecur={this.state.interval}
                        updateInterval={this.updateInterval}
                        selectedInterval={this.state.interval}
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
                          selectedPickerValue={this.state.pickerValue}
                        />
                        <IntervalInput
                          frequency={this.state.frequency}
                          dailyRecur={this.state.interval}
                          updateInterval={this.updateInterval}
                          selectedInterval={this.state.interval}
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
              selectedDate={this.state.start_date}
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
                      selectedOccurrence={this.state.occurrences}
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
              selectedDate={this.state.end_date}
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

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskForm);
