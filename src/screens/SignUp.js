import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';

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
      }
    });
  }

  render() {
    return (
      <View style={styles.signupForm}>
        <Input
          containerStyle={styles.inputStyle}
          onChangeText={this.onFirstNameChange.bind(this)}
          label='First name'
          value={this.props.first_name}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputStyle}
          label='Last name'
          onChangeText={this.onLastNameChange.bind(this)}
          value={this.props.last_name}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputStyle}
          label='Email'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputStyle}
          secureTextEntry
          label='Password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          containerStyle={styles.inputStyle}
          label='Zipcode'
          onChangeText={this.onZipCodeChange.bind(this)}
          value={this.props.zip_code}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Button
          style={styles.buttonStyle}
          onPress={this.onSignUpButtonPress.bind(this)}
          title='Sign Up'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  signupForm: {
    alignSelf: 'stretch',
    height: '100%',
    marginTop: '70%',
    marginLeft: '5%',
    marginBottom: '10%'
  },
  inputStyle: {
    alignSelf: 'stretch',
    borderBottomColor: '#f8f8f8',
    marginBottom: 5
  },
  buttonStyle: {
    marginLeft: 5,
    marginRight: 25,
    marginTop: 10
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);
