import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { View, StyleSheet, ScrollView, ImageBackground, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

import { emailChanged, passwordChanged, loginUser, clearError } from '../actions';
import { Spinner } from '../components/common';

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn } = auth;
  return { email, password, error, loading, loggedIn };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  emailChanged,
  passwordChanged,
  loginUser,
  clearError
}, dispatch);

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password })
    .then(() => {
      if (this.props.loggedIn) {
        this.props.navigation.navigate('HomeNavigator');
      }
    });
  }

  onSignUpButtonPress() {
    this.props.navigation.navigate('SignUp');
  }

  renderError() {
    if (this.props.error) {
      Alert.alert(
        'Authentication Failed.',
        ' Please try with correct credentials.',
        [
          { text: 'Ok', onPress: () => this.props.clearError(), style: 'cancel' },
        ],
        { cancelable: false }
      );
    }
  }

  renderLoginButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <View>
        <Button
          buttonStyle={styles.button}
          titleStyle={{ fontWeight: '700' }}
          onPress={this.onLoginButtonPress.bind(this)}
          title='Log In'
        />
        <Text style={styles.text}> OR </Text>
      </View>
    );
  }

  renderSignUpButton() {
    return (
      <Button
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: '700' }}
        onPress={this.onSignUpButtonPress.bind(this)}
        title='Sign Up'
      />
    );
  }

  render() {
    const imageSource = { uri: 'https://images.unsplash.com/photo-1533892743580-890e5b193113?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=cb2f494bb8c83e80437bdc584f8eb773&auto=format&fit=crop&w=800&q=60' };
    return (
      <ImageBackground source={imageSource} style={{ width: '100%', height: '100%' }}>
        <ScrollView
          on-drag
        >
          <View>
            <Text
              style={styles.logo}
              h1
            > proTracker</Text>
          </View>
          <View style={styles.login}>
            <Input
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              placeholderTextColor='#fff'
              leftIcon={{ type: 'font-awesome', name: 'envelope', color: '#fff' }}
              leftIconContainerStyle={styles.leftIconContainer}
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
              onFocus={this.focus}
              onBlur={this.blur}
            />

            <Input
              secureTextEntry
              containerStyle={styles.inputContainer}
              inputStyle={styles.input}
              placeholder='Password'
              placeholderTextColor='#fff'
              leftIcon={{ type: 'font-awesome', name: 'lock', color: '#fff' }}
              leftIconContainerStyle={styles.leftIconContainer}
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
              onFocus={this.focus}
              onBlur={this.blur}
            />
              {this.renderError()}
              {this.renderLoginButton()}
              {this.renderSignUpButton()}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    marginBottom: '10%',
    fontSize: 20,
    color: '#FF0033',
    alignSelf: 'center',
  },
  login: {
    height: '100%',
    marginTop: '40%',
    marginLeft: '10%',
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
  button: {
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#17BCAE'
  },
  text: {
    alignSelf: 'center',
    justifyContent: 'center',
    color: '#fff'
  },
  leftIconContainer: {
    marginLeft: '0%',
    marginRight: '5%',
  },
  logo: {
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: '30%'
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
