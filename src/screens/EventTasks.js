import React, { Component } from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';

class EventTask extends Component {
  render() {
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{
            text: 'Events',
            style: { color: '#fff', fontWeight: 'bold' }
          }}
          rightComponent={{
            icon: 'Next',
            color: '#fff'
          }}
        />
      </View>
    );
  }
}

export default EventTask;
