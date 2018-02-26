import { combineReducers } from 'redux';
import * as reducers from './modules/index';

export default combineReducers({
  ...reducers
});