import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Taskbar from '../Taskbar';
import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import Profile from '../Profile';
import People from '../People';
import Viewed from '../Viewed';
import Liked from '../Liked';

const App = ({ location, classes }) => {
	const isLoggedIn = true;
	const id = 2;

	return (
		<Router>
			<div className={classes.content}>
				<Taskbar isLoggedIn={isLoggedIn} />
				{isLoggedIn ? (
					<Switch location={location}>
						<Route exact path="/" component={Home} />
						<Route exact path="/profile">
							<Profile id={id} />
						</Route>
						<Route exact path="/viewed/:id" component={Viewed} />
						<Route exact path="/liked/:id" component={Liked} />
						<Route exact path="/people/:id" component={People} />
						<Route render={() => <div>Not found</div>} />
					</Switch>
				) : (
					<Switch location={location}>
						<Redirect exact from="/" to="/login" />
						<Route path="/login/:nextRoute*" component={Login} />
						<Route path="/signup" component={Signup} />
						<Route render={() => <div>Not found</div>} />
					</Switch>
				)}
			</div>
		</Router>
	);
};

const styles = (theme) => ({
	content: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		overflowY: 'auto',
		overflowX: 'hidden',
		paddingLeft: theme.spacing(3),
		paddingRight: theme.spacing(3),
		backgroundColor: theme.palette.primary.main,
	},
});

export default withStyles(styles)(App);
