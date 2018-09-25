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
import Table from 'components/Table/Table.jsx'

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
    alignItems: 'center',
    cursor: 'pointer'
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
  }
})

class CreatePoll extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      edit_modal: false,
      delete_modal: false,
      answers: null,
      question_value: '',
      answer_value: ''
    }
  }

  handleOpen = e => {
    if (this.id === 'edit_modal') {
      this.setState({ edit_modal: true })
      console.log('this id edit')
    } else if (this.id === 'delete_modal') {
      this.setState({ delete_modal: true })
      console.log('this id del')
    }
  }

  handleClose = e => {
    e.currentTarget
    this.setState({ edit_modal: false })
  }

  handleAddAnswer = e => {
    e.preventDefault()
    const { answer_value } = this.state
    this.props.onAddAnswer({
      answer_value: ''
    })
  }
  handleAddAnswers = answers => {
    const nextAnswer = [answers, ...this.state.answers]
    this.setState({ answers: nextAnswer })
  }

  render() {
    const { classes } = this.props
    const { edit_modal, delete_modal, answers } = this.state
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Create new poll</h4>
                <p className={classes.cardCategoryWhite}>
                  Please, added your question and answersfor polling
                </p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Question"
                      id="question"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                    <Table
                      tableData={Array.from(Array(5).keys()).map(idx => [
                        <div className={classes.answerItem} fullWidth>
                          <div onClick={this.handleOpen}>
                            This is the Answer {idx + 1} for the Question
                            <Modal
                              id="edit_modal"
                              open={edit_modal}
                              onClose={this.handleClose}
                            >
                              <div className={classes.paper}>
                                <Typography variant="title">
                                  Edit Answer
                                </Typography>
                                <TextField
                                  id="filled-full-width"
                                  label="Edit answer"
                                  fullWidth
                                  margin="normal"
                                  variant="filled"
                                  InputLabelProps={{
                                    shrink: true
                                  }}
                                  value="This is the Answer ${idx + 1} for the Question"
                                />
                                <Button color="warning">
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
                            <Button color="warning">
                              <Cancel />
                              <Modal
                                id="delete_modal"
                                open={delete_modal}
                                onClose={this.handleClose}
                              >
                                <div className={classes.paper}>
                                  <Typography variant="title">
                                    Edit Answer
                                  </Typography>
                                  <TextField
                                    id="filled-full-width"
                                    label="Edit answer"
                                    fullWidth
                                    margin="normal"
                                    variant="filled"
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    value="This is the Answer ${idx + 1} for the Question"
                                  />
                                  <Button color="warning">
                                    <Done />
                                  </Button>
                                </div>
                              </Modal>
                            </Button>
                          </div>
                        </div>
                      ])}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleAddAnswer}>
                  Add answer
                </Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(styles)(CreatePoll)
