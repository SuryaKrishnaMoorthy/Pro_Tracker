import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Input, Text, ListItem } from 'react-native-elements';

import {
  events,
  home,
  health,
  academics,
  pets
  } from '../helpers';

class SelectTask extends Component {
    constructor(props) {
      super(props);
      this.state = {
        task_name: this.props.navigation.getParam('task_name')
      };
    }
    onInputChange = (text) => {
      this.setState({ task_name: text });
    }

    getTaskCategory() {
      const { navigation } = this.props;
      switch (navigation.getParam('task_category').toLowerCase()) {
        case 'events':
          return events;
        case 'home':
          return home;
        case 'health':
          return health;
        case 'academics':
          return academics;
        case 'pets':
          return pets;
        default:
          return events;
      }
    }

    render() {
      const { navigation } = this.props;

      return (
        <View>
          <Header
            leftComponent={{
              icon: 'chevron-left',
              color: '#fff',
              onPress: () => navigation.navigate('AddTask')
            }}
            centerComponent={{
              text: navigation.getParam('task_name'),
              style: { color: '#fff', fontWeight: 'bold' }
            }}
            rightComponent={{
              icon: 'chevron-right',
              color: '#fff',
              onPress: () => navigation.navigate('TaskForm', { task_name: this.state.task_name })
            }}
          />
          <Input
            placeholder='Write your task...'
            leftIcon={{ type: 'font-awesome', name: 'pencil' }}
            value={this.state.task_name}
            onChangeText={this.onInputChange}
          />
          <View>
            <Text>Or choose from below..</Text>

            {
              this.getTaskCategory().map((item, index) =>
                <ListItem
                  style={styles.container}
                  title={item.value}
                  chevron
                  bottomDivider
                  chevronColor={'black'}
                  key={index}
                  onPress={() => navigation.navigate('TaskForm', {
                    task_name: this.state.task_name || item.value
                  })}
                />
              )
            }
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {

    },
    row: {
      padding: 15,
      backgroundColor: 'skyblue',
    }
  });

export default SelectTask;
