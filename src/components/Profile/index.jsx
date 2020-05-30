import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Register = ({ classes }) => {
	const [username, setUsername] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('female');
	const [preference, setPreference] = useState('woman');

	const tempProfile = {
		username: 'cterblan',
		first: 'Corry',
		last: 'Terblanche',
		email: 'cterblan@student.wethinkcode.co.za',
		gender: 'male',
		preference: 'women',
	};

	useEffect(() => {
		setUsername(tempProfile.username);
		setFirst(tempProfile.first);
		setLast(tempProfile.last);
		setEmail(tempProfile.email);
		setGender(tempProfile.gender);
		setPreference(tempProfile.preference);
	}, [
		tempProfile.email,
		tempProfile.first,
		tempProfile.gender,
		tempProfile.last,
		tempProfile.preference,
		tempProfile.username,
	]);

	const handleGender = (event) => {
		setGender(event.target.value);
	};

	const handlePreference = (event) => {
		setPreference(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username);
	};
	return (
		<Grid
			container
			justify="center"
			direction="column"
			className={classes.content}
		>
			<Paper elevation={4} className={classes.paper}>
				<Grid container justify="center">
					<Grid item className={classes.item}>
						<Typography
							variant="h4"
							align="center"
							color="primary"
						>
							Your Profile
						</Typography>
					</Grid>

					<Grid item className={classes.item}>
						<Grid
							container
							justify="center"
							style={{ marginTop: '12px' }}
						>
							<img
								src="https://picsum.photos/200/150"
								alt="profile"
							/>
						</Grid>
					</Grid>

					<Grid item className={classes.item}>
						<form onSubmit={(e) => handleSubmit(e)}>
							<TextField
								required
								fullWidth
								label="Username"
								type="input"
								color="primary"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
							<TextField
								required
								fullWidth
								label="First Name"
								type="input"
								color="primary"
								onChange={(e) => setFirst(e.target.value)}
								value={first}
							/>
							<TextField
								required
								fullWidth
								label="Last Name"
								type="input"
								color="primary"
								onChange={(e) => setLast(e.target.value)}
								value={last}
							/>
							<TextField
								required
								fullWidth
								label="Email"
								type="email"
								color="primary"
								onChange={(e) => setEmail(e.target.value)}
								value={email}
							/>
							<Grid container justify="space-evenly">
								<Grid item>
									<Typography
										variant="h6"
										align="center"
										className={classes.radioTitle}
									>
										Gender
									</Typography>
									<RadioGroup
										aria-label="gender"
										value={gender}
										onChange={handleGender}
									>
										<FormControlLabel
											value="female"
											control={
												<Radio color="primary" />
											}
											label="Female"
										/>
										<FormControlLabel
											value="male"
											control={
												<Radio color="primary" />
											}
											label="Male"
										/>
									</RadioGroup>
								</Grid>
								<Grid item>
									<Typography
										variant="h6"
										align="center"
										className={classes.radioTitle}
									>
										Preference
									</Typography>
									<RadioGroup
										aria-label="preference"
										value={preference}
										onChange={handlePreference}
									>
										<FormControlLabel
											value="women"
											control={
												<Radio color="primary" />
											}
											label="Women"
										/>
										<FormControlLabel
											value="men"
											control={
												<Radio color="primary" />
											}
											label="Men"
										/>
										<FormControlLabel
											value="other"
											control={
												<Radio color="primary" />
											}
											label="Other"
										/>
									</RadioGroup>
								</Grid>
							</Grid>
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
							>
								Save Changes
							</Button>

							<NavLink to="reset">
								<Button
									fullWidth
									type="submit"
									variant="contained"
									className={classes.button}
								>
									Change your password?
								</Button>
							</NavLink>

							<NavLink to="/">
								<Button
									fullWidth
									type="submit"
									variant="contained"
									className={classes.button}
								>
									Back To Home
								</Button>
							</NavLink>
						</form>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
};

const styles = (theme) => ({
	content: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(5),
	},
	paper: {
		padding: theme.spacing(2),
		backgroundColor: theme.palette.secondary.main,
		width: '40%',
		marginLeft: '30%',
	},
	item: {
		width: '90%',
	},
	button: {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	link: {
		textDecoration: 'none',
		marginTop: theme.spacing(2),
	},
	linkText: {
		width: '10%',
		marginLeft: '45%',
		'&:hover': {
			borderBottom: `1px dotted ${theme.palette.secondary.main}`,
		},
	},
	radioTitle: {
		borderBottom: `1px dotted ${theme.palette.primary.main}`,
	},
});

export default withStyles(styles)(Register);
