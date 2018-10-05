import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Cancel from '@material-ui/icons/Cancel'
import Done from '@material-ui/icons/Done'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'

const styles = theme => ({
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0'
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none'
  },
  answerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  handleModal: {
    cursor: 'pointer'
  }
})

class CreatePoll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      edit_modal: false,
      delete_modal: false,
      answers: [],
      question_value: '',
      answer_value: 'Click to edit'
    }
  }

  handleOpen = e => {
    if (e.target.id === 'edit_modal') {
      this.setState({ edit_modal: true })
    } else if (e.target.id === 'delete_modal') {
      this.setState({ delete_modal: true })
    }
  }

  handleClose = () => {
    this.setState({ edit_modal: false, delete_modal: false })
  }

  handleAddAnswer = e => {
    e.preventDefault()
    const { answer_value } = this.state
    this.props.onAddAnswer({
      answer_value: 'Click to edit'
    })
  }

  inputOnChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddAnswers = answers => {
    const nextAnswer = [answers, ...this.state.answers]
    this.setState({ answers: nextAnswer })
  }

  saveQuestion() {}

  render() {
    const { classes } = this.props
    const {
      edit_modal,
      delete_modal,
      answers,
      question_value,
      answer_value
    } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create new poll</h4>
                <p className={classes.cardCategoryWhite}>
                  Please, added your question and answers for polling
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <TextField
                      label="Question"
                      name="question_value"
                      id="question"
                      value={question_value}
                      onChange={this.inputOnChange}
                      fullWidth
                    />
                    {answers.map(function(idx) {
                      return (
                        <List idx={idx} component="nav">
                          <ListItem className={classes.answerItem} fullWidth>
                            <div
                              className={classes.handleModal}
                              id="edit_modal"
                              onClick={this.handleOpen}
                            >
                              {answer_value}
                              <Modal
                                open={edit_modal}
                                onClose={this.handleClose}
                              >
                                <div className={classes.paper}>
                                  <Typography variant="title">
                                    Edit Answer
                                  </Typography>
                                  <TextField
                                    id="filled-full-width"
                                    name="answer_value"
                                    value={answer_value}
                                    onChange={this.inputOnChange}
                                    label="Edit answer"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                  />
                                  <Button
                                    color="info"
                                    onClick={this.handleClose}
                                  >
                                    <Done />
                                  </Button>
                                </div>
                              </Modal>
                            </div>
                            <div>
                              <Button color="info">
                                <ArrowUpward />
                              </Button>
                              <Button color="info">
                                <ArrowDownward />
                              </Button>
                              <Button
                                color="warning"
                                id="delete_modal"
                                onClick={this.handleOpen}
                              >
                                <Cancel />
                                <Modal
                                  open={delete_modal}
                                  onClose={this.handleClose}
                                >
                                  <div className={classes.paper}>
                                    <Typography align="center" variant="title">
                                      Delete this answer
                                    </Typography>
                                    <div className={classes.answerItem}>
                                      <Button
                                        color="warning"
                                        onClick={this.handleClose}
                                      >
                                        <Cancel />
                                      </Button>
                                      <Button color="info">
                                        <Done />
                                      </Button>
                                    </div>
                                  </div>
                                </Modal>
                              </Button>
                            </div>
                          </ListItem>

                          <Divider />
                        </List>
                      )
                    })}
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleAddAnswer}>
                  Add answer
                </Button>
                <Button color="info">Save</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(styles)(CreatePoll)
