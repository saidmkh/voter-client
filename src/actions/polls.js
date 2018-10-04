import API from 'axios'
import { SET_POLLS } from './constants'
import store from '../store/store'

export const setPollsDispatch = item => dispatch => {
  API.get(`/users/${this.props.user.id}`)
    .then(res => {
      dispatch(res.data)
    })
    .catch(err => console.log(err))
}
