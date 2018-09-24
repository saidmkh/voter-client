// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
// import ContentPaste from "@material-ui/icons/ContentPaste";
import LibraryBooks from '@material-ui/icons/LibraryBooks'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import Notifications from '@material-ui/icons/Notifications'
import Unarchive from '@material-ui/icons/Unarchive'
// core components/views
import DashboardPage from 'views/Dashboard/Dashboard.jsx'
import Poll from 'views/Poll/Poll.jsx'
import CreatePoll from 'views/CreatePoll/CreatePoll.jsx'
import SignUp from 'views/SignUp/SignUp.jsx'
import SignIn from 'views/SignIn/SignIn.jsx'
import EmailVerify from 'views/EmailVerify/EmailVerify.jsx'

const dashboardRoutes = [
	{
		path: '/sign-up',
		sidebarName: 'Sign up',
		navbarName: 'Sign up',
		icon: LibraryBooks,
		component: SignUp
	},
	{
		path: '/sign-in',
		sidebarName: 'Sign in',
		navbarName: 'Sign in',
		icon: BubbleChart,
		component: SignIn
	},
	{
		path: '/verify-email',
		navbarName: 'Verify email',
		icon: BubbleChart,
		component: EmailVerify
	},
	{
		path: '/dashboard',
		sidebarName: 'Dashboard',
		navbarName: 'Dashboard',
		icon: Dashboard,
		component: DashboardPage
	},
	{
		path: '/poll',
		sidebarName: 'Poll',
		navbarName: 'Poll',
		icon: 'content_paste',
		component: Poll
	},
	{
		path: '/create-poll',
		sidebarName: 'Create poll',
		navbarName: 'Create poll',
		icon: 'content_paste',
		component: CreatePoll
	},
	{ redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
]

export default dashboardRoutes
