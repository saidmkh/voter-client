// @material-ui/icons
import Dashboard from '@material-ui/icons/Dashboard'
import Assignment from '@material-ui/icons/Assignment'
import Person from '@material-ui/icons/Person'
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
    icon: Person,
    component: SignUp
  },
  {
    path: '/sign-in',
    sidebarName: 'Sign in',
    navbarName: 'Sign in',
    icon: Person,
    component: SignIn
  },
  {
    path: '/verify-email',
    navbarName: 'Verify email',
    icon: Person,
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
    icon: Assignment,
    component: Poll
  },
  {
    path: '/create-poll',
    sidebarName: 'Create poll',
    navbarName: 'Create poll',
    icon: Assignment,
    component: CreatePoll
  },
  { redirect: true, path: '/', to: '/dashboard', navbarName: 'Redirect' }
]

export default dashboardRoutes
