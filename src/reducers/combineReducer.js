import { combineReducers } from 'redux'
import errorReducer from './errors'
import authReducer from './authReducer'
import pollsReducer from './pollsReducer'

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  polls: pollsReducer
})
