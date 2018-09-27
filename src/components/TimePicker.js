import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';


class TimePicker extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
      endTime: `${new Date().getHours()}:` +
      `${new Date().getMinutes() + 30}`
    };
  }

render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20 }}>Start Time: </Text>
          <DatePicker
            mode="time"
            customStyles={{
              dateIcon: {
                display: 'none'
              },
              dateTouchBody: {
                width: 100,
                height: 50,
                marginLeft: 10
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
          <Text style={{ marginTop: 20, marginRight: 9 }}>End Time:</Text>
            <DatePicker
            customStyles={{
              dateIcon: {
                display: 'none'
              },
              dateTouchBody: {
                width: 100,
                height: 50,
                marginLeft: 10,
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
