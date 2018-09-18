import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './app/reducers/index';
import logger from 'redux-logger';

const store = createStore(reducer, applyMiddleware(logger, thunk));

export default store;
