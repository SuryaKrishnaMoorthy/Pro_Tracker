import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text } from 'react-native';
import moment from 'moment';

class DatePickerPro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD')
    };
  }

render() {
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20 }}>Start Date: </Text>
          <DatePicker
            mode="date"
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
            date={this.state.startDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({ startDate: date });
              this.props.updateDate(date, this.state.endDate);
            }}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20, marginRight: 9 }}>End Date:</Text>
            <DatePicker
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
            mode="date"
            date={this.state.endDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({ endDate: date });
              this.props.updateDate(this.state.startDate, date);
            }}
            />
        </View>
    </View>
    );
  }
}

export { DatePickerPro };
