import { SET_CURRENT_USER, USER_ANSWERS } from '../actions/constants'
import checkEmpty from '../_helpers/check_empty'

const initialState = {
  isLogged: false,
  user: {},
  answers: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isLogged: !checkEmpty(action.payload),
        user: action.payload
      }
    case USER_ANSWERS:
      return {
        ...state,
        isLogged: !checkEmpty(action.payload),
        answers: action.payload
      }
    default:
      return state
  }
}
