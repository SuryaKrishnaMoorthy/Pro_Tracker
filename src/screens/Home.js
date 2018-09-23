import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Header } from 'react-native-elements';
import ListItem from '../components/ListItem';

class HomeScreen extends Component {
  render() {
    const imageSource = { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxUzbCCpQTbr0X1khDXNbBzYkpDiR33Pu-3pHVRvXH0vRfwXYn' };
    return (
      <View>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'Home Screen', style: { color: '#fff' } }}
          rightComponent={{ icon: 'home', color: '#fff' }}
        />
        <View>
          <Image source={imageSource} style={{ height: 200, resizeMode: 'stretch' }} />
        </View>
        <ListItem navigation={this.props.navigation.navigate} />
      </View>
    );
  }
}

export default HomeScreen;
