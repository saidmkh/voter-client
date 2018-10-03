import { GET_POLLS } from '../actions/constants'

const initialState = {
  polls: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POLLS:
      return {
        ...state,
        polls: action.payload
      }
    default:
      return state
  }
}
