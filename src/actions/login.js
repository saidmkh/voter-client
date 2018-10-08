import API from 'axios'
import setToken from '../_config/setToken'
import jwt_decode from 'jwt-decode'
import { push } from 'react-router-redux'
import { GET_ERRORS, SET_CURRENT_USER } from './constants'

export const registerDispatch = (user, history) => dispatch => {
	console.log(user)
	API.post('/users/register', user)
		.then(res =>
			history.push('/verify-email/?=click_link_in_server_console???')
		)
		.catch(err => {
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data
			})
		})
}

export const verifyEmailDispatch = user => dispatch => {
	console.log(user)
	API.post('users/verify_email', user)
		.then(res => {
			console.log(res.data)
			const { token } = res.data
			localStorage.setItem('jwtToken', token)
			setToken(token)
			const decoded = jwt_decode(token)
			dispatch(setCurrentUser(decoded))
			dispatch(push('/dashboard'))
		})
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
			console.log(res.data)
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
	dispatch(push('/sign-in'))
}

export const setCurrentUser = decoded => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded
	}
}
