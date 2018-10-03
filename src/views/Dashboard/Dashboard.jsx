import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import GridItem from 'components/Grid/GridItem.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Table from 'components/Table/Table.jsx'

import dashboardStyle from 'assets/jss/material-dashboard-react/views/dashboardStyle.jsx'
import CreatePoll from '../CreatePoll/CreatePoll'
import { getPollsDispatch } from '../../actions/polls'

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
      value: 0,
      polls: [],
      voted_list: 'not_voted'
    }
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
    console.log(e.currentTarget.id)
    console.log(this.state.voted_list)
  }

  componentDidMount() {
    this.setState({
      polls: getPollsDispatch
    })
  }

  render() {
    const { classes } = this.props
    const { voted_list } = this.state
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
                {voted_list === 'not_voted' ? (
                  <Table
                    tableHeaderColor="primary"
                    tableData={Array.from(Array(10).keys()).map(idx => [
                      <Button color="secondary" fullWidth align="left">
                        {`This is the Question for poll #${idx +
                          1}, please answer it`}
                      </Button>
                    ])}
                  />
                ) : (
                  <Table
                    tableHeaderColor="primary"
                    tableData={Array.from(Array(10).keys()).map(idx => [
                      <Button color="secondary" fullWidth align="left">
                        {`This is the Question for poll #${idx + 1}`}
                      </Button>
                    ])}
                  />
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
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  polls: state.polls
})

export default connect(
  mapStateToProps,
  { getPollsDispatch }
)(withStyles(styles)(withStyles(dashboardStyle)(Dashboard)))
