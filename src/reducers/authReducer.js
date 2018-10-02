import { SET_CURRENT_USER } from '../actions/constants'
import checkEmpty from '../_helpers/check_empty'

const initialState = {
  isLogged: false,
  user: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isLogged: !checkEmpty(action.payload),
        user: action.payload
      }
    default:
      return state
  }
}
