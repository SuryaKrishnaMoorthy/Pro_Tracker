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
      <View style={styles.container}>
        <Text>End after</Text>
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
        <Text>occurrences</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '48%',
    marginTop: '5%',
    borderRightWidth: 0.7,
    borderColor: 'black',
    paddingRight: 10
  },
  input: {
    fontSize: 15,
    height: 15,
    paddingLeft: 0
  }
});

export { OccurrenceCount };
