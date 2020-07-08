import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Login = ({ classes, logIn, errors }) => {
	const [email, setEmail] = useState('');
	const [pwd, setPwd] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		logIn(email, pwd);
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
							Login
						</Typography>
					</Grid>

					<Grid item style={{ width: '100%' }}>
						<form onSubmit={(e) => handleSubmit(e)}>
							<TextField
								required
								fullWidth
								label="Email"
								type="input"
								color="primary"
								onChange={(e) => setEmail(e.target.value)}
							/>

							<TextField
								label="Password"
								type="password"
								fullWidth
								required
								color="primary"
								onChange={(e) => setPwd(e.target.value)}
							/>

							{errors.map((msg) => (
								<Grid item>
									<Typography
										key={msg}
										variant="body1"
										color="primary"
									>
										{msg}
									</Typography>
								</Grid>
							))}

							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
							>
								Log In
							</Button>

							<NavLink
								to="/signup"
								style={{ textDecoration: 'none' }}
							>
								<Button
									fullWidth
									type="submit"
									variant="contained"
									className={classes.button}
								>
									Register
								</Button>
							</NavLink>
						</form>
					</Grid>
				</Grid>
			</Paper>
			<NavLink to="/passwordReset" className={classes.link}>
				<Typography
					variant="body1"
					color="secondary"
					align="center"
					className={classes.linkText}
				>
					Forgot Password?
				</Typography>
			</NavLink>
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
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			marginLeft: '0',
		},
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
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			marginLeft: '5%',
		},
	},
});

export default withStyles(styles)(Login);
