import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';

import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Spinner } from '../components/common';

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
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
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
          style={styles.buttonStyle}
          onPress={this.onLoginButtonPress.bind(this)}
          title='Login'
        />
        <Text style={styles.textStyle}> OR </Text>
      </View>
    );
  }

  renderSignUpButton() {
    return (
      <Button
        style={styles.buttonStyle}
        onPress={this.onSignUpButtonPress.bind(this)}
        title='Sign Up'
      />
    );
  }

  render() {
    return (

      <View style={styles.login}>
        <Input
          containerStyle={styles.inputStyle}
          placeholder='Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'grey' }}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          onFocus={this.focus}
          onBlur={this.blur}
        />

        <Input
          secureTextEntry
          containerStyle={styles.inputStyle}
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock', color: 'grey' }}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          onFocus={this.focus}
          onBlur={this.blur}
        />
          {this.renderError()}
          {this.renderLoginButton()}
          {this.renderSignUpButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
  },
  login: {
    alignSelf: 'stretch',
    height: '100%',
    marginTop: '90%',
    marginLeft: '10%',
    marginRight: '10%',
    marginBottom: '10%'
  },
  inputStyle: {
    alignSelf: 'stretch',
    borderBottomColor: '#f8f8f8',
    marginLeft: '5%',
    marginBottom: '5%'
  },
  buttonStyle: {
    margin: 10
  },
  textStyle: {
    alignSelf: 'center',
    justifyContent: 'center'
  },
  leftIconContainerStyle: {
    marginLeft: '0%',
    marginRight: '5%',
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn } = auth;
  return { email, password, error, loading, loggedIn };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);

/* <Card>
  <CardSection>
    <Input
      label="email"
      placeholder="user@email.com"
      onChangeText={this.onEmailChange.bind(this)}
      value={this.props.email}
    />
  </CardSection>

  <CardSection>
    <Input
      secureTextEntry
      label="password"
      placeholder="password"
      onChangeText={this.onPasswordChange.bind(this)}
      value={this.props.password}
    />
  </CardSection>

  {this.renderError()}
  <CardSection>
    {this.renderLoginButton()}
  </CardSection>
  <CardSection>
    {this.renderSignUpButton()}
  </CardSection>
</Card> */
