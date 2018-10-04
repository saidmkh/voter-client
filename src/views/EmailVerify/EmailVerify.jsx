import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
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

import { verifyEmailDispatch } from '../../actions/login'

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
	loginInputBlock: {
		marginBottom: '20px'
	}
})

class EmailVerify extends React.Component {
	constructor() {
		super()
		this.state = {
			email: '',
			verify_code: ''
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
			verify_code: this.state.verify_code
		}
		this.props.verifyEmailDispatch(user, this.props.history)
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
		const { email, verify_code } = this.state
		return (
			<div>
				<Grid container>
					<GridItem xs={12} sm={12} md={8}>
						<Card>
							<form onSubmit={this.formSubmit}>
								<CardHeader color="primary">
									<h4 className={classes.cardTitleWhite}>
										Email verification to finish registration with Voter App
									</h4>
									<p className={classes.cardCategoryWhite}>
										Please, confirm email address
									</p>
								</CardHeader>
								<CardBody>
									<Grid container className={classes.loginInputBlock}>
										<GridItem xs={12} sm={12} md={6}>
											<TextField
												type="email"
												label="Email address"
												id="email_address"
												name="email"
												value={email}
												onChange={this.inputOnChange}
												fullWidth
											/>
										</GridItem>
									</Grid>
									<Grid container className={classes.loginInputBlock}>
										<GridItem xs={12} sm={12} md={6}>
											<TextField
												type="email"
												label="Verification code"
												id="verification_code"
												name="verify_code"
												value={verify_code}
												onChange={this.inputOnChange}
												inputProps={{ type: 'text' }}
												fullWidth
											/>
										</GridItem>
									</Grid>
								</CardBody>
								<CardFooter>
									<Grid container>
										<GridItem xs={12} sm={12} md={12}>
											<Button type="submit" color="primary">
												verify email
											</Button>
										</GridItem>
										<GridItem xs={12} sm={12} md={12}>
											<Link color="secondary" to="/sign-in">
												already have an account? sign-in
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
	auth: state.auth
})

export default connect(
	mapStateToProps,
	{ verifyEmailDispatch }
)(withRouter(withStyles(styles)(EmailVerify)))
