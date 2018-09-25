import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Cancel from '@material-ui/icons/Cancel'
import InputLabel from '@material-ui/core/InputLabel'
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

const styles = {
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
  }
}

function CreatePoll(props) {
  const { classes } = props
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
                        {`This is the Answer ${idx + 1} for the Question`}
                        <div>
                          <Button color="info">
                            <ArrowUpward />
                          </Button>
                          <Button color="info">
                            <ArrowDownward />
                          </Button>
                          <Button color="warning">
                            <Cancel />
                          </Button>
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

export default withStyles(styles)(CreatePoll)
