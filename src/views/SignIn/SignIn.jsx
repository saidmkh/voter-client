import React from 'react'
import { Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'

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
	}
})

class SignIn extends React.Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: ''
		}
		this.inputOnChange = this.inputOnChange.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
	}

	inputOnChange(e) {
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	formSubmit(e) {
		e.preventDefault()
		const user = {
			email: this.state.email,
			password: this.state.password,
			repeat_passwor: this.state.repeat_password
		}
		console.log(user)
	}

	render() {
		const { classes } = this.props
		const { email, password } = this.state
		return (
			<div>
				<Grid container>
					<GridItem xs={12} sm={12} md={8}>
						<Card>
							<CardHeader color="primary">
								<h4 className={classes.cardTitleWhite}>Sign into Voter App</h4>
								<p className={classes.cardCategoryWhite}>
									Please, enter your email and password
								</p>
							</CardHeader>
							<CardBody>
								<form onSubmit={this.formSubmit}>
									<Grid container>
										<GridItem xs={12} sm={12} md={6}>
											<CustomInput
												labelText="Email address"
												id="email_address"
												onChange={this.inputOnChange}
												value={email}
												formControlProps={{
													fullWidth: true
												}}
											/>
										</GridItem>
									</Grid>
									<Grid container>
										<GridItem xs={12} sm={12} md={6}>
											<CustomInput
												labelText="Password"
												id="password"
												onChange={this.inputOnChange}
												value={password}
												formControlProps={{
													fullWidth: true
												}}
												inputProps={{ type: 'password' }}
											/>
										</GridItem>
									</Grid>
								</form>
							</CardBody>
							<CardFooter>
								<Grid container>
									<GridItem xs={12} sm={12} md={12}>
										<Button color="primary">Sign up</Button>
									</GridItem>
									<GridItem xs={12} sm={12} md={12}>
										<Link color="secondary" to="/sign-up">
											first time user? sign-up
										</Link>
									</GridItem>
								</Grid>
							</CardFooter>
						</Card>
					</GridItem>
				</Grid>
			</div>
		)
	}
}

export default withStyles(styles)(SignIn)
