import API from 'axios'
import { CURRENT_POLL, VOTE_POLL } from './constants'
import store from '../store/store'

export const currentPollDispatch = poll => dispatch => {
	dispatch({
		type: CURRENT_POLL,
		payload: poll
	})
}

export const votePollDispatch = answer => dispatch => {
	dispatch({
		type: VOTE_POLL,
		payload: answer
	})
}
