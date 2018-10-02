import API from 'axios'
import setToken from '../_config/setToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from './constants'

export const registerDispatch = (user, history) => dispatch => {
  console.log(API)
  API.post('/users/register', user)
    .then(res => history.push('/sign-in'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const loginDispatch = user => dispatch => {
  API.post('/users/login', user)
    .then(res => {
      const { token } = res.data
      localStorage.setItem('jwtToken', token)
      setToken(token)
      const decoded = jwt_decode(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

export const logoutDispatch = history => dispatch => {
  localStorage.removeItem('jwtToken')
  setToken(false)
  dispatch(setCurrentUser({}))
  history.push('/sign-in')
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
