import { CURRENT_POLL, VOTE_POLL } from '../actions/constants'

const initialState = {
	current_poll: {},
	current_answer: {}
}

export default function(state = initialState, action) {
	switch (action.type) {
		case CURRENT_POLL:
			return {
				...state,
				current_poll: action.payload
			}
		case VOTE_POLL:
			return {
				...state,
				current_answer: action.payload
			}
		default:
			return state
	}
}
