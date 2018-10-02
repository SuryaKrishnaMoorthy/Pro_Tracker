import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel }
  from 'react-native-simple-radio-button';
import React, { Component } from 'react';
import { View } from 'react-native';

class RadioButtonPro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      index: this.props.selectedFrequency || 0
    };
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <RadioForm
          formHorizontal
          animation
        >
          {
            this.props.radioProps.map((obj, i) =>
            <RadioButton
              labelHorizontal
              key={i}
            >
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={this.state.index === i}
                onPress={(value, index) => {
                  this.setState({ value, index });
                  this.props.updateFrequency(value);
                }}
                borderWidth={1}
                buttonInnerColor={'#2ecc71'}
                buttonOuterColor={this.state.index === i ? '#2196f3' : '#000'}
                buttonSize={10}
                buttonOuterSize={16}
                buttonStyle={{}}
                buttonWrapStyle={{
                  marginLeft: 10,
                  marginTop: 2
                }}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal
                onPress={(value, index) => {
                  this.setState({ value, index });
                  this.props.updateFrequency(value);
                }}
                labelStyle={{
                  fontSize: 18,
                  color: '#000',
                  paddingLeft: 4
                }}
                labelWrapStyle={{
                  paddingRight: 10
                }}
              />
              </RadioButton>
            )
          }
        </RadioForm>
      </View>
    );
  }
}

export { RadioButtonPro };
