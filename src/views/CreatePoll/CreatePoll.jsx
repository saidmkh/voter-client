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

import API from 'axios'

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
			answer_text_index: null,
			edit_text: ''
		}

		this.handleAddAnswers = this.handleAddAnswers.bind(this)
	}

	inputChangeSave = e => {
		let answers = this.state.answers.slice()
		answers[this.state.answer_text_index].text = this.state.edit_text
		this.setState({ answers })
		this.handleClose()
	}

	inputOnChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleAddAnswers() {
		let answers = this.state.answers.slice()
		let text = `Click to edit Answer #${answers.length + 1}`
		let number = this.state.answers.length + 1
		answers.push(Object.assign({}, { text, number }))
		this.setState({ answers })
	}

	handleDelAnswer(idx) {
		this.state.answers.slice().splice(idx, 1)
	}

	handleOpen = (idx, e) => {
		console.log(this.state.answers, idx)
		let edit_text = this.state.answers[idx].text
		let answer_text_index = idx

		this.setState({ edit_modal: true, edit_text, answer_text_index })
	}

	handleClose = () => {
		this.setState({ edit_modal: false, edit_text: '' })
	}

	saveQuestion() {
		let question = this.state.question_value
		let answers = this.state.answers.map((obj, idx) => {
			return Object.assign({}, obj, {
				text: this.state.answers[idx].text,
				number: idx + 1
			})
		})
		let Question = {
			question,
			answers
		}
		console.log(Question)
		API.post(`/questions/`, Question)
			.then(res => {
				console.log(res.data)
			})
			.catch(err => console.log(err))
		this.props.history.push('/Dashboard')
	}

	componentDidMount() {
		this.handleAddAnswers()
	}

	render() {
		const { classes } = this.props
		const {
			edit_modal,
			delete_modal,
			answers,
			question_value,
			text
		} = this.state
		let self = this
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
										{answers.map((obj, idx) => {
											console.log(obj.text, idx)
											return (
												<List key={idx} idx={idx} component="nav">
													<ListItem className={classes.answerItem} fullWidth>
														<div className={classes.handleModal}>
															<span
																id="edit_modal"
																onClick={() => self.handleOpen(idx)}
															>
																{obj.text}
															</span>
															<Modal
																open={edit_modal}
																onClose={self.handleClose}
																name="edit_modal"
															>
																<div className={classes.paper}>
																	<Typography variant="title">
																		Edit Answer
																	</Typography>
																	<TextField
																		id="edit_text"
																		name="edit_text"
																		value={obj.edit_text}
																		onChange={e => self.inputOnChange(e)}
																		label="Edit answer"
																		fullWidth
																		margin="normal"
																		variant="filled"
																		InputLabelProps={{
																			shrink: true
																		}}
																	/>
																	<Button
																		color="warning"
																		onClick={self.handleClose}
																	>
																		<Cancel />
																	</Button>
																	<Button
																		color="info"
																		onClick={self.inputChangeSave}
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
																name="delete_modal"
																onClick={self.handleOpen.bind(this, idx)}
															>
																<Cancel />
																<Modal
																	name="delete_model"
																	open={delete_modal}
																	onClose={self.handleClose}
																>
																	<div className={classes.paper}>
																		<Typography align="center" variant="title">
																			Delete this answer
																		</Typography>
																		<div className={classes.answerItem}>
																			<Button
																				color="warning"
																				onClick={self.handleClose}
																			>
																				<Cancel />
																			</Button>
																			<Button
																				color="info"
																				onClick={() =>
																					self.handleDelAnswer(idx)
																				}
																			>
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
								<Button color="primary" onClick={this.handleAddAnswers}>
									Add answer
								</Button>
								<Button
									color="info"
									onClick={this.saveQuestion.bind(this, null)}
								>
									Save
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
