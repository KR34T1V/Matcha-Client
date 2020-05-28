import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Login = ({ classes }) => {
	const [username, setUsername] = useState('');
	const [pwd, setPwd] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, pwd);
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

					<Grid item>
						<form onSubmit={(e) => handleSubmit(e)}>
							<TextField
								required
								fullWidth
								label="Username"
								type="input"
								color="primary"
								onChange={(e) => setUsername(e.target.value)}
							/>

							<TextField
								label="Password"
								type="password"
								fullWidth
								required
								color="primary"
								onChange={(e) => setPwd(e.target.value)}
							/>

							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
							>
								Log In
							</Button>

							<NavLink to="signup">
								<Button
									fullWidth
									type="submit"
									variant="contained"
									className={classes.button}
								>
									Sign Up
								</Button>
							</NavLink>
						</form>
					</Grid>
				</Grid>
			</Paper>
			<NavLink to="password-reset" className={classes.link}>
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
});

export default withStyles(styles)(Login);
