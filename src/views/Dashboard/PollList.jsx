import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import { currentPollDispatch } from '../../actions/polls'
import { connect } from 'react-redux'

const styles = theme => ({
  pollsList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  pollsItem: {
    display: 'flex',
    justifyContent: 'center',
    color: 'black',
    overflow: 'hidden'
  }
})

class PollList extends React.Component {
  render() {
    const { classes, obj, idx } = this.props
    return (
      <div
        className={classes.pollsList}
        key={idx}
        onClick={() => this.props.currentPollDispatch(obj)}
      >
        <Link to={`/poll/${obj._id}`}>
          <List component="nav">
            <ListItem button className={classes.pollsItem}>
              {obj.text}
            </ListItem>
          </List>
          <Divider />
        </Link>
      </div>
    )
  }
}

PollList.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  current_poll: state.current_poll
})

export default connect(
  mapStateToProps,
  {
    currentPollDispatch
  }
)(withStyles(styles)(PollList))
