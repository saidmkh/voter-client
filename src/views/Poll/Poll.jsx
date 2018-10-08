import React from 'react'
import API from 'axios'
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles'
// core components
import GridItem from 'components/Grid/GridItem.jsx'
import GridContainer from 'components/Grid/GridContainer.jsx'
import Card from 'components/Card/Card.jsx'
import CardHeader from 'components/Card/CardHeader.jsx'
import CardBody from 'components/Card/CardBody.jsx'
import Table from 'components/Table/Table.jsx'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { setCurrentUser } from '../../actions/login'
import { connect } from 'react-redux'
import { votePollDispatch } from '../../actions/polls'

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
	},
	chartWrapper: {
		height: '12px',
		width: '200px',
		marginLeft: '35px'
	},
	answerChart: {
		height: '100%',
		backgroundColor: 'indigo',
		borderRadius: '3px'
	},
	answerReplies: {
		marginLeft: 'auto'
	}
}

class Poll extends React.Component {
	constructor() {
		super()
		this.state = {
			answer_text: '',
			replies: null,
			answers: [],
			text: '',
			totalReplies: []
		}

		this.getPoll = this.getPoll.bind(this)
	}

	getPoll() {
		let url = window.location.href.split('/')[4]
		API.get(`/questions/${url}`)
			.then(res => {
				let sumReplies = []
				for (let i = 0; i < res.data.answers.length; i++) {
					sumReplies.push(res.data.answers[i].replies)
				}

				sumReplies = sumReplies.reduce(function(a, b) {
					return a + b
				}, 0)

				this.setState({
					text: res.data.text,
					answers: res.data.answers,
					totalReplies: sumReplies
				})
			})
			.catch(err => console.log(err))
	}

	componentDidMount() {
		this.getPoll()
	}

	userVote(answer) {
		let question = window.location.href.split('/')[4]
		API.put(`users/${this.props.user.id}/question/${question}/answer/${answer}`)
	}

	render() {
		let self = this
		const { classes } = this.props
		const { text, answers, totalReplies } = this.state
		console.log('objecdddt', this.props.user)

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
								<h4>{text}</h4>
								<GridContainer>
									<GridItem xs={12} sm={12} md={12}>
										{answers.map(function(obj, idx) {
											let precent_replies = (obj.replies / totalReplies) * 100
											console.log(obj.replies, totalReplies)
											return (
												<List key={idx} idx={idx} obj={obj}>
													<ListItem
														button
														className={classes.answerItem}
														fullWidth
														onClick={() => {
															self.userVote(obj._id)
														}}
													>
														<span>{obj.text}</span>
														<span className={classes.answerReplies}>
															{obj.replies}
														</span>
														<div className={classes.chartWrapper}>
															<div
																className={classes.answerChart}
																style={{
																	maxWidth: '100%',
																	width: `${precent_replies}%`
																}}
															/>
														</div>
													</ListItem>
												</List>
											)
										})}
									</GridItem>
								</GridContainer>
							</CardBody>
						</Card>
					</GridItem>
				</GridContainer>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	current_poll: state.current_poll,
	user: state.auth.user
})

export default connect(mapStateToProps)(withStyles(styles)(Poll))
