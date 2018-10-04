import React from 'react'
import { connect } from 'react-redux'
import API from 'axios'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'

import LinearProgress from '@material-ui/core/LinearProgress'

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx'
import CreatePoll from '../CreatePoll/CreatePoll'
import PollList from './PollList'

const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  addPollBtn: {
    marginBottom: '15px'
  }
})

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      polls: [],
      value: 0,
      voted_list: '',
      setPolls: [],
      isLoading: true
    }

    this.getAllPolls = this.getAllPolls.bind(this)
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  handleVoteBtn = e => {
    if (e.currentTarget.id === 'not_voted') {
      this.setState({ voted_list: 'not_voted' })
    } else if (e.currentTarget.id === 'voted') {
      this.setState({ voted_list: 'voted' })
    }
    this.getFilterPolls()
  }

  getFilterPolls() {
    API.get(`/users/${this.props.user.id}`)
      .then(res => {
        console.log(res.data)
        this.setState({
          setPolls: res.data
        })
      })
      .catch(err => console.log(err))
  }

  getAllPolls() {
    API.get('/questions').then(res => {
      console.log(res.data)
      this.setState({
        polls: res.data,
        isLoading: false
      })
    })
  }

  componentDidMount() {
    this.getAllPolls()
  }

  render() {
    const { classes } = this.props
    const { voted_list, isLoading, polls, setPolls } = this.state
    return (
      <div>
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Link to="/create-poll/">
              <Button color="primary" className={classes.addPollBtn}>
                Add new poll
              </Button>
            </Link>
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Polls</h4>
                <Grid container>
                  <GridItem xs={6} sm={6} md={6}>
                    <Button
                      id="not_voted"
                      color={
                        voted_list === 'not_voted' ? 'primary' : 'disabled'
                      }
                      onClick={this.handleVoteBtn}
                    >
                      Not voted polls
                    </Button>
                  </GridItem>
                  <GridItem xs={6} sm={6} md={6}>
                    <Button
                      id="voted"
                      color={voted_list === 'voted' ? 'primary' : 'disabled'}
                      onClick={this.handleVoteBtn}
                    >
                      Voted polls
                    </Button>
                  </GridItem>
                </Grid>
              </CardHeader>
              <CardBody>
                {isLoading ? (
                  <LinearProgress />
                ) : voted_list === 'voted' ? (
                  polls
                    .filter(poll => {
                      return setPolls.indexOf(poll._id) !== -1
                    })
                    .map(function(obj, idx) {
                      return <PollList key={idx} idx={idx} obj={obj} />
                    })
                ) : (
                  polls
                    .filter(poll => {
                      return setPolls.indexOf(poll._id) === -1
                    })
                    .map(function(obj, idx) {
                      return <PollList key={idx} idx={idx} obj={obj} />
                    })
                )}
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    )
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  polls: PropTypes.array.isRequired,
  setPolls: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  polls: state.polls,
  user: state.auth.user
})

export default connect(mapStateToProps)(
  withStyles(styles)(withStyles(dashboardStyle)(Dashboard))
)
