import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Header, Input, Text, ListItem } from 'react-native-elements';

import { taskCategory } from '../helpers';
import proBackground from '../assets/pro-background.jpg';

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
      <ScrollView>
        <View>
        {/* <ImageBackground source={proBackground} style={{ height: '130%' }}> */}
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
                leftIcon={{ name: 'beer', type: 'ionicon' }}
                key={index}
                onPress={() => navigation.navigate('SelectTask', {
                  task_category: item.value,
                  task_name: this.state.task_name
                })}
              />
            )
          }
        </View>
      {/* </ImageBackground> */}
    </View>
      </ScrollView>
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
