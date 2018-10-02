import React, { Component } from 'react';
import { View, Picker } from 'react-native';

class PickerPro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selectedPickerValue || '31'
    };
  }

  render() {
    return (
      <View>
          <Picker
            selectedValue={this.state.value}
            onValueChange={value => {
              this.setState({ value });
              this.props.pickerValueChange(value);
              }
            }
          >
          {
            Object.keys(this.props.pickerValues).map((key, index) =>
              <Picker.Item key={index} label={key} value={this.props.pickerValues[key]} />
            )
          }
          </Picker>
      </View>
    );
  }
}


export { PickerPro };
