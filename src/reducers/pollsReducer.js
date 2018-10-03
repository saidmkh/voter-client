import { SET_POLLS } from '../actions/constants'

const initialState = {
  setPolls: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POLLS:
      return {
        ...state,
        setPolls: action.payload
      }
    default:
      return state
  }
}
