import React, { Component } from 'react';
import { ImageBackground, View } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Button,
  Header, Right, Title } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getTasksByType,
  getCurrentDayTasks,
  logoutUser
} from '../actions';
import proBackground from '../assets/pro-background.jpg';

const mapStateToProps = ({ data }) => {
  return data;
};

const mapDispatchToProps = dispatch => bindActionCreators({
  getCurrentDayTasks,
  getTasksByType,
  logoutUser
 }, dispatch);

class Sidebar extends Component {
  render() {
    const { navigator } = this.props;
    return (

      <Container style={{ borderWidth: 0 }}>
        <View>
          <ImageBackground source={proBackground} style={{ height: '100%' }}>
            <Header>
            <Body>
              <Title>proTracker</Title>
            </Body>
          </Header>
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
              <Text>Home</Text>
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
              <Text>Personal</Text>
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
              <Text>Professional</Text>
            </Body>
          </ListItem>
        </Content>
        <Content>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#FF9501' }}>
                <Icon active name="home" />
              </Button>
            </Left>
            <Body>
              <Text>Notifications</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#007AFF' }}>
                <Icon active name='people' />
              </Button>
            </Left>
            <Body>
              <Text>Invite Friends</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#007AFF' }}>
                <Icon active name="send" />
              </Button>
            </Left>
            <Body>
              <Text>Send Feedback</Text>
            </Body>
          </ListItem>
          <ListItem
            icon
            onPress={() => {
              console.log('Sidebar: Logout');
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
              <Text>Logout</Text>
            </Body>
          </ListItem>
          <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: '#007AFF' }}>
                <Icon active name="home" />
              </Button>
            </Left>
            <Body>
              <Text>Delete Account?</Text>
            </Body>
          </ListItem>
        </Content>
    </ImageBackground>

    </View>
  </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
