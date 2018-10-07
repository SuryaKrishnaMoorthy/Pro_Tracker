import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
          backgroundColor='#43C6AC'
          leftComponent={{
            icon: 'chevron-left',
            color: '#191654',
            onPress: () => navigation.navigate('HomeNavigator')
          }}
          centerComponent={{
            text: 'What would you like to track?',
            style: { color: '#191654', fontWeight: 'bold' }
          }}
          rightComponent={{
            icon: 'chevron-right',
            color: '#191654',
            onPress: () => navigation.navigate('TaskForm', { task_name: this.state.task_name })
          }}
        />
        <ScrollView style={{ height: '100%' }}>
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
              taskCategory.map((item, index) =>
                <ListItem
                  containerStyle={styles.container}
                  topDivider
                  bottomDivider
                  title={item.value}
                  titleStyle={styles.title}
                  chevron
                  bottomDivider
                  chevronColor={'#191654'}
                  leftIcon={{
                    name: `${item.icon}`,
                    type: `${item.iconType}`,
                    color: `${item.iconColor}`
                  }}
                  key={index}
                  onPress={() => navigation.navigate('SelectTask', {
                    task_category: item.value,
                    task_name: this.state.task_name
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


export default AddTask;
