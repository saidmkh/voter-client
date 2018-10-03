import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
// core components
import footerStyle from 'assets/jss/material-dashboard-react/components/footerStyle.jsx'

function Footer({ ...props }) {
  const { classes, isLogged } = props

  if (isLogged) {
    return (
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <Link to="/dashboard" className={classes.block}>
                  Dashboard
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/poll" className={classes.block}>
                  Poll
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/create-poll" className={classes.block}>
                  Create Poll
                </Link>
              </ListItem>
            </List>
          </div>
          <p className={classes.right}>
            <span>
              &copy; {1900 + new Date().getYear()}{' '}
              <Link to="/" className={classes.a}>
                Votes
              </Link>
              , made with love for a better web
            </span>
          </p>
        </div>
      </footer>
    )
  } else {
    return (
      <footer className={classes.footer}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <Link to="/sign-in" className={classes.block}>
                  Sign-in
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link to="/sign-up" className={classes.block}>
                  Sign-up
                </Link>
              </ListItem>
            </List>
          </div>
          <p className={classes.right}>
            <span>
              &copy; {1900 + new Date().getYear()}{' '}
              <Link to="/" className={classes.a}>
                Votes
              </Link>
              , made with love for a better web
            </span>
          </p>
        </div>
      </footer>
    )
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged
})

export default connect(mapStateToProps)(withStyles(footerStyle)(Footer))
