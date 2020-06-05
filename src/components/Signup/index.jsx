import React, { useState } from 'react';
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
	const [pwd, setPwd] = useState('');
	const [cpwd, setCPwd] = useState('');
	const [gender, setGender] = useState('female');
	const [preference, setPreference] = useState('woman');

	const handleGender = (event) => {
		setGender(event.target.value);
	};

	const handlePreference = (event) => {
		setPreference(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		fetch("http://localhost:3030/register", {
				method: "post",
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
			  
				//make sure to serialize your JSON body
				body: JSON.stringify({
					Username: username,
					Firstname: first,
					Lastname: last,
					Email: email,
					Password: pwd,
					RePassword: cpwd,
					Gender: gender,
					SexualPreference: preference
				})
			})
			.then( (response) => { 
			console.log(response);
			//do something awesome that makes the world a better place
		});
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
							Register
						</Typography>
					</Grid>

					<Grid item>
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
							<TextField
								label="Password"
								type="password"
								fullWidth
								required
								color="primary"
								onChange={(e) => setPwd(e.target.value)}
								value={pwd}
							/>
							<TextField
								label="Confirm Password"
								type="password"
								fullWidth
								required
								color="primary"
								onChange={(e) => setCPwd(e.target.value)}
								value={cpwd}
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
											value="Female"
											control={
												<Radio color="primary" />
											}
											label="Female"
										/>
										<FormControlLabel
											value="Male"
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
											value="Bisexual"
											control={
												<Radio color="primary" />
											}
											label="Bisexual"
										/>
										<FormControlLabel
											value="Heterosexual"
											control={
												<Radio color="primary" />
											}
											label="Heterosexual"
										/>
										<FormControlLabel
											value="Homosexual"
											control={
												<Radio color="primary" />
											}
											label="Homosexual"
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
								Register
							</Button>
							<NavLink to="login">
								<Button
									fullWidth
									type="submit"
									variant="contained"
									className={classes.button}
								>
									Login
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
		marginLeft: '5%',
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
