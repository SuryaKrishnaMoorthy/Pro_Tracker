import React, { Component } from 'react';
import { ImageBackground, View, Alert, StyleSheet } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Button,
  Header,
  Title } from 'native-base';
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
    console.log('user', this.props.data, this.props.auth);
    return (
      <Container>
        <View style={styles.imageBackground}>
          <ImageBackground
            source={proBackground}
            style={styles.imageBackground}
          >
            <View>
            <Text>Welcome {user}</Text>
            </View>
              {/* <Body>
                <View style={{ width: '100%' }}>
                  <Title>proTracker</Title>
                </View>
              </Body>
            </Header> */}
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
                  <Button style={{ backgroundColor: '#FF9501' }}>
                    <Icon active name="home" />
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
                  navigator.navigate('HomeNavigator');
                  this.props.closeDrawer();
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon active name='list' />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Personal</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                onPress={() => {
                  this.props.getTasksByType('professional');
                  navigator.navigate('HomeNavigator');
                  this.props.closeDrawer();
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon active name="list" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Professional</Text>
                </Body>
              </ListItem>
            </Content>
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
                    <Icon active name="home" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Badges</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon active name='people' />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Invite Friends</Text>
                </Body>
              </ListItem>
              <ListItem icon>
                <Left>
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon active name="send" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Send Feedback</Text>
                </Body>
              </ListItem>
              <ListItem
                icon
                style={styles.text}
                onPress={() => {
                  this.props.logoutUser();
                  navigator.navigate('Login');
                }}
              >
                <Left>
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon active name="home" />
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
                  <Button style={{ backgroundColor: '#007AFF' }}>
                    <Icon active name="home" />
                  </Button>
                </Left>
                <Body>
                  <Text style={styles.text}>Delete Account?</Text>
                </Body>
              </ListItem>
            </Content>
          </ImageBackground>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  imageBackground: {
    width: '100%',
    height: '100%'
  },
  header: {
    width: '100%',
  },
  text: {
    color: '#ffffff'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
