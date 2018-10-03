import React from 'react'
import classNames from 'classnames'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Hidden from '@material-ui/core/Hidden'
import Poppers from '@material-ui/core/Popper'
// @material-ui/icons
import Person from '@material-ui/icons/Person'
import Button from 'components/CustomButtons/Button.jsx'
import { connect } from 'react-redux'
import { logoutDispatch } from '../../actions/login'

import headerLinksStyle from 'assets/jss/material-dashboard-react/components/headerLinksStyle.jsx'

const userEmail = {
  display: 'flex',
  alignItems: 'center'
}

class HeaderLinks extends React.Component {
  state = {
    open: false
  }

  userLogout(e) {
    e.preventDefault()
    this.props.logoutDispatch(this.props.history)
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }

  render() {
    const { classes, isLogged, user } = this.props
    const { open } = this.state
    if (isLogged) {
      return (
        <div>
          <div style={userEmail}>
            <div>{user.email}</div>
            <Button
              buttonRef={node => {
                this.anchorEl = node
              }}
              color={window.innerWidth > 959 ? 'transparent' : 'white'}
              justIcon={window.innerWidth > 959}
              simple={!(window.innerWidth > 959)}
              aria-owns={open ? 'menu-list-grow' : null}
              aria-haspopup="true"
              onClick={this.handleToggle}
              className={classes.buttonLink}
            >
              <Person className={classes.icons} />
              <Hidden mdUp implementation="css">
                <p className={classes.linkText}>Profile</p>
              </Hidden>
            </Button>
            <Poppers
              open={open}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !open }) +
                ' ' +
                classes.pooperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom'
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={
                            (this.handleClose, this.userLogout.bind(this))
                          }
                          className={classes.dropdownItem}
                        >
                          Logout
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }
}

const mapStateToProps = state => ({
  isLogged: state.auth.isLogged,
  user: state.auth.user
})

export default connect(
  mapStateToProps,
  { logoutDispatch }
)(withStyles(headerLinksStyle)(HeaderLinks))
