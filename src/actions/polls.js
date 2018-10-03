import API from 'axios'
import { push } from 'react-router-redux'
import { GET_ERRORS } from './constants'

export const getPollsDispatch = polls => dispatch => {
  console.log(polls)
  API.get('/questions', polls)
    .then(res => console.log(polls))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}
