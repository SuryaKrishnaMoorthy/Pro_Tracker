import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

class Separator extends Component {
  render() {
    return (
      <View style={styles.separator} />
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: 400,
    backgroundColor: '#E4E4E4',
    marginLeft: 15,
  },
});

export { Separator };
