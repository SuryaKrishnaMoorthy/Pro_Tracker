import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk';
import reducers from '../reducers';

const store = createStore(reducers, {}, applyMiddleware(logger, ReduxThunk));

export default store;
