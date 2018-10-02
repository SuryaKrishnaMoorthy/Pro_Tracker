import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Input, Text, ListItem } from 'react-native-elements';

import { taskCategory } from '../helpers';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task_name: ''
    };
  }
  onInputChange = (text) => {
    this.setState({ task_name: text });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View>
        <Header
          leftComponent={{
            icon: 'chevron-left',
            color: '#fff',
            onPress: () => navigation.navigate('HomeNavigator')
          }}
          centerComponent={{
            text: 'What would you like to track?',
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
            taskCategory.map((item, index) =>
              <ListItem
                style={styles.container}
                title={item.value}
                chevron
                bottomDivider
                chevronColor={'black'}
                key={index}
                onPress={() => navigation.navigate('SelectTask', {
                  task_category: item.value,
                  task_name: this.state.task_name
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


export default AddTask;
