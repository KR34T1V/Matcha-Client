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

const App = ({ location, classes }) => {
	const isLoggedIn = true;

	return (
		<Router>
			<div className={classes.content}>
				<Taskbar isLoggedIn={isLoggedIn} />
				{isLoggedIn ? (
					<Switch location={location}>
						<Route exact path="/" component={Home} />
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
