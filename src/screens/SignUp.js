import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView, View, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Input, Button, Icon, Text } from 'react-native-elements';

import {
  firstNameChanged,
  lastNameChanged,
  zipCodeChanged,
  emailChanged,
  passwordChanged,
  signUpUser
} from '../actions';

const mapStateToProps = ({ auth }) => {
  const {
    email,
    password,
    first_name,
    last_name,
    zip_code,
    error,
    loading,
    loggedIn
  } = auth;

  return { email, password, first_name, last_name, zip_code, error, loading, loggedIn };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  firstNameChanged,
  lastNameChanged,
  zipCodeChanged,
  emailChanged,
  passwordChanged,
  signUpUser
 }, dispatch);

class SignUpScreen extends Component {

  onFirstNameChange(text) {
    this.props.firstNameChanged(text);
  }

  onLastNameChange(text) {
    this.props.lastNameChanged(text);
  }

  onZipCodeChange(text) {
    this.props.zipCodeChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onSignUpButtonPress() {
    const {
      email,
      password,
      first_name,
      last_name,
      zip_code
    } = this.props;

    this.props.signUpUser({
      email,
      password,
      first_name,
      last_name,
      zip_code
    })
    .then(() => {
      if (this.props.loggedIn) {
        this.props.navigation.navigate('HomeNavigator');
      } else {
        Alert.alert(
          'Registration Failed.',
          'Please try again.',
          [
            { text: 'Ok', style: 'cancel' },
          ],
          { cancelable: false }
        );
      }
    });
  }

  render() {
    const imageSource = { uri: 'https://images.unsplash.com/photo-1533892743580-890e5b193113?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cb2f494bb8c83e80437bdc584f8eb773&auto=format&fit=crop&w=800&q=60' };
    return (
      <ImageBackground source={imageSource} style={{ width: '100%', height: '100%' }}>
        <ScrollView
          on-drag
        >
        <Icon
          size={36}
          containerStyle={styles.iconContainer}
          name='chevron-left'
          color='#00aced'
          onPress={() => this.props.navigation.goBack()}
        />
        <View>
          <Text
            style={styles.logo}
            h1
          > proTracker</Text>
        </View>
      <View style={styles.signupForm}>
        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          onChangeText={this.onFirstNameChange.bind(this)}
          placeholder='First name'
          placeholderTextColor='#fff'
          leftIcon={{ type: 'font-awesome', name: 'user', color: '#fff' }}
          leftIconContainerStyle={styles.leftIconContainer}
          value={this.props.first_name}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholder='Last name'
          placeholderTextColor='#fff'
          leftIcon={{ type: 'font-awesome', name: 'user', color: '#fff' }}
          leftIconContainerStyle={styles.leftIconContainer}
          onChangeText={this.onLastNameChange.bind(this)}
          value={this.props.last_name}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholder='Email'
          placeholderTextColor='#fff'
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#fff' }}
          leftIconContainerStyle={styles.leftIconContainer}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          secureTextEntry
          placeholder='Password'
          placeholderTextColor='#fff'
          leftIcon={{ type: 'font-awesome', name: 'lock', color: '#fff' }}
          leftIconContainerStyle={styles.leftIconContainer}
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholder='Zipcode'
          placeholderTextColor='#fff'
          leftIcon={{ type: 'font-awesome', name: 'map-marker', color: '#fff' }}
          leftIconContainerStyle={styles.leftIconContainer}
          onChangeText={this.onZipCodeChange.bind(this)}
          value={this.props.zip_code}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Button
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontWeight: '700' }}
          onPress={this.onSignUpButtonPress.bind(this)}
          title='Sign Up'
        />
      </View>
      </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  iconContainer: {
    marginTop: 40,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  signupForm: {
    height: '100%',
    marginTop: '30%',
    marginLeft: '15%',
    marginRight: '10%',
    marginBottom: '10%'
  },
  inputContainer: {
    borderBottomColor: '#f8f8f8',
    marginLeft: '5%',
    marginBottom: '5%'
  },
  input: {
    color: '#fff'
  },
  buttonStyle: {
    marginLeft: '5%',
    marginRight: '4%',
    borderRadius: 5,
    backgroundColor: '#17BCAE'
  },
  leftIconContainer: {
    marginLeft: '0%',
    marginRight: '5%',
  },
  logo: {
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: '10%'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
