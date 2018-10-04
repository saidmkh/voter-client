import API from 'axios'
import { CURRENT_POLL } from './constants'
import store from '../store/store'

export const currentPollDispatch = poll => dispatch => {
  console.log(poll)
  dispatch({
    type: CURRENT_POLL,
    payload: poll
  })
}
