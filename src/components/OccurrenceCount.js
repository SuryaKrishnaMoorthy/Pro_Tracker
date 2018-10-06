import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Input } from 'react-native-elements';

class OccurrenceCount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      occurrences: this.props.selectedOccurrence || 0,
    };
  }

  render() {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <Text style={styles.textStyle}>End after</Text>
        <View>
          <Input
            inputContainerStyle={{ width: 30 }}
            inputStyle={styles.input}
            maxLength={3}
            keyboardType='numeric'
            onChangeText={(value) => {
              this.setState({ occurrences: value });
              this.props.updateOccurrences(value);
            }}
            value={this.state.occurrences.toString()}
          />
        </View>
        <Text style={styles.textStyle}>occurrences</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

export { OccurrenceCount };
