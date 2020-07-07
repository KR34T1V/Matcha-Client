import React, { useState, useEffect } from 'react';
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
import Chat from '../Chat';
import Connexions from '../Connexions';

const App = ({ location, match, classes }) => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [verified, setVerified] = useState(false);
	const [accessToken, setAccessToken] = useState('');

	const [errors, setErrors] = useState([]);

	const expiredToken = () => {
		setLoggedIn(false);
		setAccessToken('');
		localStorage.setItem('accessToken', null);
		localStorage.setItem('verified', null);
		setErrors([]);
	};

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

		const { data } = await raw.json();
		if (data.res === 'Error' && data.errors.length > 0) {
			setErrors(data.errors);
		} else if (data.res === 'Success' && data.AccessToken != null) {
			const { AccessToken, Verified } = data;
			setAccessToken(AccessToken);
			setLoggedIn(true);
			setVerified(Verified);
			localStorage.setItem('accessToken', AccessToken);
			localStorage.setItem('verified', Verified);
			setErrors([]);
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
		localStorage.setItem('accessToken', null);
		localStorage.setItem('verified', null);
		setErrors([]);
	};

	const checkLogin = () => {
		const accToken = localStorage.getItem('accessToken');
		const verifyed = localStorage.getItem('verified');
		// localStorage sets as string :/
		if (
			accToken !== 'null' &&
			verifyed !== 'null' &&
			accToken != null &&
			verifyed != null
		) {
			setAccessToken(accToken);
			setVerified(Boolean(verifyed));
			setLoggedIn(true);
		} else {
			setVerified(false);
			setLoggedIn(false);
			setAccessToken('');
		}
	};

	useEffect(() => {
		checkLogin();
	}, []);

	return (
		<Router>
			<div className={classes.content}>
				<Taskbar
					isLoggedIn={loggedIn}
					verified={verified}
					logOut={logOutUser}
					expiredToken={expiredToken}
				/>
				{loggedIn ? (
					verified ? (
						<Switch location={location}>
							<Route exact path="/">
								<Home
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Route exact path="/profile">
								<Profile
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Route exact path="/viewed">
								<Viewed
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Route
								exact
								path="/liked"
								expiredToken={expiredToken}
							>
								<Liked
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Route
								exact
								path="/people/:id"
								expiredToken={expiredToken}
							>
								<People
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Route path="/chat/:id">
								<Chat
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Route
								exact
								path="/connexions"
								expiredToken={expiredToken}
							>
								<Connexions
									accessToken={accessToken}
									expiredToken={expiredToken}
								/>
							</Route>
							<Redirect exact from="/login" to="/" />
							<Route render={() => <div>Not found</div>} />
						</Switch>
					) : (
						<Switch location={location}>
							<Route exact path="/verify" />
							<VerifyEmail
								verifyUser={setVerified}
								expiredToken={expiredToken}
							/>
							<Redirect exact from="/login" to="/verify" />
						</Switch>
					)
				) : (
					<Switch location={location}>
						<Redirect exact from="/" to="/login" />
						<Redirect exact from="/verify" to="/login" />
						<Redirect exact from="/chat" to="/login" />
						<Redirect exact from="/connexions" to="/login" />
						<Redirect exact from="/chat/:id" to="/login" />
						<Redirect exact from="/profile" to="/login" />
						<Route path="/login">
							<Login
								logIn={logInUser}
								errors={errors}
								setErrors={setErrors}
							/>
						</Route>
						<Route exact path="/signup" component={Signup} />
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
