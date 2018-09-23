import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';
import {
  firstNameChanged,
  lastNameChanged,
  zipCodeChanged,
  emailChanged,
  passwordChanged,
  signUpUser
} from '../actions';

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
        this.props.navigation.navigate('Home');
      }
    });
  }


  render() {
    return (
      <View>
        <FormLabel>FirstName</FormLabel>
        <FormInput
          onChangeText={this.onFirstNameChange.bind(this)}
          value={this.props.first_name}
        />

        <FormLabel>LastName</FormLabel>
        <FormInput
          onChangeText={this.onLastNameChange.bind(this)}
          value={this.props.last_name}
        />

        <FormLabel>Email</FormLabel>
        <FormInput
          placeholder='user@email.com'
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />

        <FormLabel>Password</FormLabel>
        <FormInput
          placeholder='password'
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />

        <FormLabel>Zipcode</FormLabel>
        <FormInput
          onChangeText={this.onZipCodeChange.bind(this)}
          value={this.props.zip_code}
        />

        <FormValidationMessage />

        <Button onPress={this.onSignUpButtonPress.bind(this)} title='Sign Up' />
      </View>
    );
  }
}

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

export default connect(mapStateToProps, {
  firstNameChanged,
  lastNameChanged,
  zipCodeChanged,
  emailChanged,
  passwordChanged,
  signUpUser
 })(SignUpScreen);
