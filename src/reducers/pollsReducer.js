import { CURRENT_POLL } from '../actions/constants'

const initialState = {
  current_poll: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case CURRENT_POLL:
      return {
        ...state,
        current_poll: action.payload
      }
    default:
      return state
  }
}
