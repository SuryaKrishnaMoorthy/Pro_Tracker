import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { View, Text } from 'react-native';


class TimePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: this.props.selectedStartTime || `${moment(new Date()).format('HH:mm')}`,
      endTime: this.props.selectedEndTime
        || `${moment(new Date()).add(30, 'minutes').format('HH:mm')}`
    };
  }

render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20 }}>Start</Text>
          <DatePicker
            mode="time"
            customStyles={{
              dateIcon: {
                display: 'none'
              },
              dateTouchBody: {
                marginTop: 9,
                marginLeft: 10,
              },
              dateInput: {
                borderWidth: 0
              }
            }}
            style={{ width: 100 }}
            date={this.state.startTime}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(time) => {
              this.setState({ startTime: time });
              this.props.updateTime(time, this.state.endTime);
            }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20 }}>End</Text>
            <DatePicker
            customStyles={{
              dateIcon: {
                display: 'none'
              },
              dateTouchBody: {
                marginTop: 9,
                marginLeft: 10,
              },
              dateInput: {
                borderWidth: 0
              }
            }}
            style={{ width: 100 }}
            mode="time"
            date={this.state.endTime}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(time) => {
              this.setState({ endTime: time });
              this.props.updateTime(this.state.startTime, time);
            }}
            />
        </View>
    </View>
    );
  }
}

export { TimePicker };
