import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
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
            backgroundColor='#43C6AC'
            leftComponent={{
              icon: 'chevron-left',
              color: '#191654',
              onPress: () => navigation.navigate('AddTask')
            }}
            centerComponent={{
              text: navigation.getParam('task_category'),
              style: { color: '#191654', fontWeight: 'bold' }
            }}
            rightComponent={{
              icon: 'chevron-right',
              color: '#191654',
              onPress: () => navigation.navigate('TaskForm', { task_name: this.state.task_name })
            }}
          />
          <ScrollView>
          <Input
            placeholder='Write your task...'
            inputStyle={styles.input}
            leftIcon={{ type: 'font-awesome', name: 'pencil' }}
            value={this.state.task_name}
            onChangeText={this.onInputChange}
          />
          <View>
            <Text style={styles.text}>Or choose from below..</Text>

            {
              this.getTaskCategory().map((item, index) =>
                <ListItem
                  containerStyle={styles.container}
                  title={item.value}
                  titleStyle={styles.title}
                  chevron
                  topDivider
                  bottomDivider
                  chevronColor={'#191654'}
                  leftIcon={{
                    name: `${item.icon}`,
                    type: `${item.iconType}`,
                    color: `${item.iconColor}`
                  }}
                  key={index}
                  onPress={() => navigation.navigate('TaskForm', {
                    task_name: this.state.task_name || item.value
                  })}
                />
              )
            }
          </View>
        </ScrollView>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#93CEC8',
      margin: 2,
    },
    title: {
      color: '#191654',
      fontSize: 15,
      fontWeight: '700'
    },
    input: {
      margin: 5,
      color: '#191654'
    },
    text: {
      margin: 15,
      fontSize: 17,
      alignSelf: 'center',
      color: '#191654',
      fontWeight: '500'
    }
  });

export default SelectTask;
