import React, { Component } from 'react';
import { ImageBackground, View, Alert, StyleSheet, ScrollView } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Left,
  Body,
  Button
} from 'native-base';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getTasksByType,
  getCurrentDayTasks,
  logoutUser,
  getBadges
} from '../actions';
import proBackground from '../assets/pro-background.jpg';

const mapStateToProps = ({ data, auth }) => {
  return { data, auth };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentDayTasks,
  getTasksByType,
  getBadges,
  logoutUser
 }, dispatch);

class Sidebar extends Component {

  handleDelete() {
    const { navigator } = this.props;

    Alert.alert(
      'Do you want to delete this account?',
      'User will be deleted permanently',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'Delete',
          onPress: () => {
            this.props.deleteUser();
            navigator.navigate('AuthNavigator');
          },
          style: 'destructive'
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { navigator } = this.props;
    const user = `${this.props.auth.first_name} ${this.props.auth.last_name} `;
    return (
      <Container>
        <View style={styles.imageBackground}>
          <View style={styles.welcomeView}>
            <Text style={styles.welcomeText}>Welcome {user}</Text>
          </View>
          <ImageBackground
            source={proBackground}
            style={styles.imageBackground}
          >
            <Content style={{ borderWidth: 0 }}>
              <ListItem
                icon
                onPress={() => {
                  this.props.getCurrentDayTasks();
                  navigator.navigate('HomeNavigator');
                  this.props.closeDrawer();
                }}
              >
                <Left>
                  <Button>
                    <Icon
                      active
                      name="home"
                    />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Home</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                onPress={() => {
                  this.props.getTasksByType('personal');
                  navigator.navigate('HomeNavigator', {
                    currentPage: 'Personal Tasks'
                  });
                  this.props.closeDrawer();
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#d26e63' }}>
                    <Icon
                      active
                      name='list'
                    />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Personal Tasks</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                onPress={() => {
                  this.props.getTasksByType('professional');
                  navigator.navigate('HomeNavigator', {
                    currentPage: 'Professional Tasks'
                  });
                  this.props.closeDrawer();
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#161a5b' }}>
                    <Icon
                      active
                      name="laptop"
                      type="font-awesome"
                      color='#DBCDC6'
                    />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Professional Tasks</Text>
                </Body>
              </ListItem>
            </Content>
            <ScrollView>
            <Content>
              <ListItem
                icon
                onPress={() => {
                  this.props.getBadges();
                  navigator.navigate('BadgeView');
                  this.props.closeDrawer();
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#FF9501' }}>
                    <Icon active color='#517fa4' name="star" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Badges</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: '#7c3f82' }}>
                    <Icon active name='people' />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Invite Friends</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: '#57bc18' }}>
                    <Icon active name="send" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Send Feedback</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                onPress={() => {
                  this.props.logoutUser();
                  navigator.navigate('Login');
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon name="exit-to-app" type='material-icons' />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Logout</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                onPress={() => this.handleDelete()}
              >
                <Left>
                  <Button style={{ backgroundColor: '#561f42' }}>
                    <Icon
                      color='#DBCDC6'
                      name="minus-circle"
                      type='font-awesome'
                    />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Delete Account?</Text>
                </Body>
              </ListItem>
            </Content>
          </ScrollView>
          </ImageBackground>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  welcomeView: {
    height: '20%',
    alignItems: 'center',
    backgroundColor: '#191654',
    width: '100%'
  },
  welcomeText: {
    marginTop: '15%',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 15
  },
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  text: {
    color: '#ffffff'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
