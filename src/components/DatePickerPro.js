import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';

class DatePickerPro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: this.props.selectedDate || moment(new Date()).format('YYYY-MM-DD')
    };
  }

render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.textStyle}>{this.props.dateText} </Text>
          <DatePicker
            mode="date"
            customStyles={{
              dateIcon: {
                display: 'none'
              },
              dateTouchBody: {
                marginTop: 9,
                marginLeft: 10
              },
              dateInput: {
                borderWidth: 0
              }
            }}
            style={{ width: 100 }}
            date={this.state.date}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={(date) => {
              this.setState({ date });
              this.props.updateDate(date);
            }}
          />
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 20,
    color: '#191654',
    fontWeight: 'bold'
  }
});

export { DatePickerPro };
