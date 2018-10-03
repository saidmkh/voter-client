import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  pollsList: {
    width: '100%',
    backgroundColor: theme.palette.background.paper
  },
  pollsItem: {
    display: 'flex',
    justifyContent: 'center',
    color: 'black'
  }
})

function PollList(props) {
  const { classes } = props
  return (
    <div className={classes.pollsList} key={props.idx}>
      <Link to={`/poll/${props.obj._id}`}>
        <List component="nav">
          <ListItem button className={classes.pollsItem}>
            {props.obj.text}
          </ListItem>
        </List>
        <Divider />
      </Link>
    </div>
  )
}

PollList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(PollList)
