import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import CustomInput from 'components/CustomInput/CustomInput.jsx'
import Button from 'components/CustomButtons/Button.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import CardFooter from 'components/Card/CardFooter.jsx'

import { loginDispatch } from '../../actions/login'

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
	errorBlock: {
		color: 'red',
		padding: '7px 10px',
		marginTop: '10px',
		fontSize: '12px',
		backgroundColor: '#ff000029'
	},
	loginInputBlock: {
		marginBottom: '20px'
	}
})

class SignIn extends React.Component {
	constructor() {
		super()
		this.state = {
			email: '',
			password: '',
			errors: {}
		}
		this.inputOnChange = this.inputOnChange.bind(this)
		this.formSubmit = this.formSubmit.bind(this)
	}

	inputOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	formSubmit = e => {
		e.preventDefault()
		const user = {
			email: this.state.email,
			password: this.state.password,
			repeat_passwor: this.state.repeat_password
		}
		this.props.loginDispatch(user)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.auth.isLogged) {
			this.props.history.push('/')
		}
		if (nextProps.errors) {
			this.setState({
				errors: nextProps.errors
			})
		}
	}

	componentDidMount() {
		if (this.props.auth.isLogged) {
			this.props.history.push('/')
		}
	}

	render() {
		const { classes } = this.props
		const { email, password, errors } = this.state
		return (
			<div>
				<Grid container>
					<GridItem xs={12} sm={12} md={8}>
						<Card>
							<form onSubmit={this.formSubmit}>
								<CardHeader color="primary">
									<h4 className={classes.cardTitleWhite}>
										Sign into Voter App
									</h4>
									<p className={classes.cardCategoryWhite}>
										Please, enter your email and password
									</p>
								</CardHeader>
								<CardBody>
									<Grid container className={classes.loginInputBlock}>
										<GridItem xs={12} sm={12} md={6}>
											<TextField
												type="email"
												label="Email address"
												name="email"
												onChange={this.inputOnChange}
												value={email}
												fullWidth
											/>
											{errors.email && (
												<div className={classes.errorBlock}>{errors.email}</div>
											)}
										</GridItem>
									</Grid>
									<Grid container className={classes.loginInputBlock}>
										<GridItem xs={12} sm={12} md={6}>
											<TextField
												type="password"
												label="Password"
												name="password"
												onChange={this.inputOnChange}
												value={password}
												fullWidth
												inputProps={{ type: 'password' }}
											/>
											{errors.password && (
												<div className={classes.errorBlock}>
													{errors.password}
												</div>
											)}
										</GridItem>
									</Grid>
								</CardBody>
								<CardFooter>
									<Grid container>
										<GridItem xs={12} sm={12} md={12}>
											<Button type="submit" color="primary">
												Sign up
											</Button>
										</GridItem>
										<GridItem xs={12} sm={12} md={12}>
											<Link color="secondary" to="/sign-up">
												first time user? sign-up
											</Link>
										</GridItem>
									</Grid>
								</CardFooter>
							</form>
						</Card>
					</GridItem>
				</Grid>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors
})

export default connect(
	mapStateToProps,
	{ loginDispatch }
)(withRouter(withStyles(styles)(SignIn)))
