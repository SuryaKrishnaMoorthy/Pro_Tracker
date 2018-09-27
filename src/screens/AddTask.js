import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Input } from 'react-native-elements';

class AddTask extends Component {

render() {
    const { navigation } = this.props;

    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: 'What would you like to track?',
            style: { color: '#fff', fontWeight: 'bold' }
          }}
          rightComponent={{
            icon: 'chevron-right',
            color: '#fff',
            onPress: () => navigation.navigate('TaskForm')
          }}
        />
        <Input
          placeholder='Write your task...'
          leftIcon={{ type: 'font-awesome', name: 'pencil' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: 'red',
    // width: '100%',
    // height: '100%'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'skyblue',
  },
  header: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: 'steelblue',
    color: 'white',
    fontWeight: 'bold',
  },
});


export default AddTask;
