import React, { useState } from 'react';
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
import PasswordReset from '../PasswordReset';
import VerifyEmail from '../VerifyEmail';

const App = ({ location, classes }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [verified, setVerified] = useState(false);
	const [accessToken, setAccessToken] = useState('');
	const [errors, setErrors] = useState([]);

	const logInUser = async (email, pwd) => {
		const raw = await fetch('http://localhost:3030/login', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Email: email,
				Password: pwd,
			}),
		});

		const data = await raw.json();

		if (data.errors != null) {
			setErrors(data.error);
		} else if (data.data != null && data.data.AccessToken != null) {
			setAccessToken(data.data.AccessToken);
			setLoggedIn(true);
			setVerified(data.data.Verified);
		} else {
			setErrors(['Network Error']);
		}
	};

	const logOutUser = async () => {
		await fetch(
			`http://localhost:3030/logout?AccessToken=${accessToken}`,
		);
		setLoggedIn(false);
		setAccessToken('');
		setErrors([]);
	};

	return (
		<Router>
			<div className={classes.content}>
				<Taskbar
					isLoggedIn={loggedIn}
					verified={verified}
					logOut={logOutUser}
				/>
				{loggedIn ? (
					verified ? (
						<Switch location={location}>
							<Route exact path="/">
								<Home accessToken={accessToken} />
							</Route>
							<Route exact path="/profile">
								<Profile accessToken={accessToken} />
							</Route>
							<Route exact path="/viewed">
								<Viewed accessToken={accessToken} />
							</Route>
							<Route exact path="/liked">
								<Liked accessToken={accessToken} />
							</Route>
							<Route exact path="/people/:id">
								<People accessToken={accessToken} />
							</Route>
							<Redirect exact from="/login" to="/" />
							<Route render={() => <div>Not found</div>} />
						</Switch>
					) : (
						<Switch location={location}>
							<Route
								exact
								path="/verify"
								component={VerifyEmail}
							/>
							<Redirect exact from="/login" to="/verify" />
						</Switch>
					)
				) : (
					<Switch location={location}>
						<Redirect exact from="/" to="/login" />
						<Redirect exact from="/verify" to="/login" />
						<Route path="/login">
							<Login
								logIn={logInUser}
								errors={errors}
								setErrors={setErrors}
							/>
						</Route>
						<Route path="/signup" component={Signup} />
						<Route
							exact
							path="/passwordReset"
							component={PasswordReset}
						/>
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
