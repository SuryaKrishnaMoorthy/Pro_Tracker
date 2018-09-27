import React, { Component } from 'react';
import { ScrollView, ImageBackground, Text } from 'react-native';
import { Header } from 'react-native-elements';
import ListItem from '../components/ListItem';

class HomeScreen extends Component {
  render() {
    const { navigation } = this.props;
    const imageSource = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUzbCCpQTbr0X1khDXNbBzYkpDiR33Pu-3pHVRvXH0vRfwXYn' };
    return (
      <ScrollView>
        <Header
          leftComponent={{
            icon: 'menu',
            color: '#fff',
            onPress: () => this.props.openDrawer()
          }}
          centerComponent={{ text: 'My Habits', style: { color: '#fff' } }}
          rightComponent={{
            icon: 'add',
            color: '#fff',
            onPress: () => navigation.navigate('AddTask')
           }}
        />
        <ImageBackground source={imageSource} style={{ height: 200 }}>
          <Text>{new Date().toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}</Text>
        </ImageBackground>
        <ListItem navigation={this.props.navigation.navigate} />
      </ScrollView>
    );
  }
}

export default HomeScreen;
