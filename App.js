import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
//import { createStore, applyMiddleware } from 'redux';
//import ReduxThunk from 'redux-thunk';
//import reducers from './src/reducers';
// import Router from './src/Router';
import AppNavigator from './src/navigation/AppNavigator';
import store from './src/components/ConfigureStore';

export default class App extends Component {
  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider
        style={styles.container}
        store={store}
      >
        <AppNavigator />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
