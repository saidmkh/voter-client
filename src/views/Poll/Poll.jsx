import React from 'react'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import InputLabel from '@material-ui/core/InputLabel'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardAvatar from 'components/Card/CardAvatar.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'
import Table from 'components/Table/Table.jsx'

import avatar from 'assets/img/faces/marc.jpg'

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
	}
}

function Poll(props) {
	const { classes } = props
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
											<div color="secondary" fullWidth align="left">
												{`This is the Answer ${idx + 1} for the Question`}
											</div>
										])}
									/>
								</GridItem>
							</GridContainer>
						</CardBody>
					</Card>
				</GridItem>
			</GridContainer>
		</div>
	)
}

export default withStyles(styles)(Poll)
