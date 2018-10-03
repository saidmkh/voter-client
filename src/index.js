import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'
import setToken from './_config/setToken'
import './_config/api'

import { logoutDispatch, setCurrentUser } from './actions/login'

import store from './store/store'

import 'assets/css/material-dashboard-react.css?v=1.5.0'

import indexRoutes from 'routes/index.jsx'

if (localStorage.jwtToken) {
  setToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000

  if (decoded.exp < currentTime) {
    store.dispatch(logoutDispatch())
    window.location.href = '/sign-in'
  }
}

const hist = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />
        })}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
)
