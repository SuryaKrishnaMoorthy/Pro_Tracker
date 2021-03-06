import React, { Component } from 'react';
import { ScrollView, ImageBackground, Text, StyleSheet, View } from 'react-native';
// import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import ListItem from '../components/ListItem';

// const mapStateToProps = ({ data }) => ({ data });

class HomeScreen extends Component {

  render() {
    const { navigation } = this.props;
    const page = navigation.getParam('currentPage')
        ?
        navigation.getParam('currentPage')
        : 'My Home';
    const imageSource = { uri: 'https://images.unsplash.com/photo-1531095955519-cb8fe8df6272?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=28869ebefb72f1b3e47deefa10c8edec&auto=format&fit=crop&w=1650&q=80' };
    return (
      <View>
        <Header
          backgroundColor='#43C6AC'
          leftComponent={{
            icon: 'menu',
            color: '#191654',
            onPress: () => this.props.openDrawer()
          }}
          centerComponent={{
            text: `${page}`,
            style: { color: '#191654', fontWeight: 'bold' }
          }}
          rightComponent={{
            icon: 'add',
            color: '#191654',
            onPress: () => navigation.navigate('AddTask')
           }}
        />
        <ScrollView style={{ height: '100%' }}>
          <ImageBackground source={imageSource} style={{ height: 200 }}>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric'
            })}</Text>
          </ImageBackground>
          <ListItem
            navigation={this.props.navigation.navigate}
            dayIndex={this.props.dayIndex}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: '75%',
    marginTop: '45%'
  }
});

export default HomeScreen;
