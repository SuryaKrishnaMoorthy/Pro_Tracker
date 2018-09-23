import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Button, Input, Spinner } from '../components/common';

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
        this.props.navigation.navigate('Home');
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
      <Button onPress={this.onLoginButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderSignUpButton() {
    return (
      <Button onPress={this.onSignUpButtonPress.bind(this)}>
        Sign up
      </Button>
    );
  }

  render() {
    return (
      <Card>

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
      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedIn } = auth;
  return { email, password, error, loading, loggedIn };
};

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
