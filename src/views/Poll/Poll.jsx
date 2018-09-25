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
    alignItems: 'center'
  },
  chartWrapper: {
    height: '12px',
    width: '200px',
    marginLeft: '35px'
  },
  answerChart: {
    height: '100%',
    backgroundColor: 'indigo'
  }
})

class Poll extends React.Component {
  state = {
    open: false
  }

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>This is poll results</h4>
                <p className={classes.cardCategoryWhite}>
                  Please, choose your answer if you have not yet
                </p>
              </CardHeader>
              <CardBody>
                <h4>The Questions is .......?</h4>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <Table
                      tableData={Array.from(Array(5).keys()).map(idx => [
                        <div className={classes.answerItem} fullWidth>
                          This is the Answer {idx + 1} for the Question
                          <div className={classes.answerItem}>
                            <span>{idx + 1}</span>
                            <div className={classes.chartWrapper}>
                              <div
                                className={classes.answerChart}
                                style={{
                                  width: `${(idx + 1) * 20}%`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      ])}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary">Add answer</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    )
  }
}

export default withStyles(styles)(Poll)
