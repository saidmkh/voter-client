import { SET_POLLS } from '../actions/constants'

const initialState = {
  setPolls: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_POLLS:
      return {
        ...state,
        ...{
          setPolls: state.polls.filter(function(obj) {
            return obj._id === action.payload
          })[0]
        }
      }
    default:
      return state
  }
}
