import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';

class IntervalInput extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.selectedInterval || 1,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.props.frequency !== 'MONTHLY'
          ? <Text style={styles.textStyle}>Recur every</Text>
         : <Text style={styles.textStyle}>Of every</Text>
        }
        <View>
          <Input
            inputContainerStyle={{ width: 30, paddingLeft: 0 }}
            inputStyle={styles.input}
            maxLength={3}
            keyboardType='numeric'
            onChangeText={(value) => {
              this.setState({ value });
              this.props.updateInterval(value);
            }}
            value={this.state.value.toString()}
          />
        </View>
        {
          this.props.frequency === 'DAILY'
          ? <Text style={styles.textStyle}>day(s)</Text>
          : ''
        }
        {
          this.props.frequency === 'WEEKLY'
          ? <Text style={styles.textStyle}>week(s)</Text>
         : ''
        }
        {
          this.props.frequency === 'MONTHLY'
          ? <Text style={styles.textStyle}>month(s)</Text>
         : ''
        }
        {
          this.props.frequency === 'YEARLY'
          ? <Text style={styles.textStyle}>year(s)</Text>
          : ''
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  input: {
    fontSize: 15,
    height: 15,
    paddingLeft: 0,
    color: '#191654',
  },
  textStyle: {
    color: '#191654',
    fontWeight: 'bold'
  }
});

export { IntervalInput };
