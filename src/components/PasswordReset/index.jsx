import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField } from '@material-ui/core';

const PasswordReset = ({ classes }) => {
	const [Email, setEmail] = useState('');
	const [VerifyKey, setKey] = useState('');
	const [Password, setPwd] = useState('');
	const [RePassword, setRePwd] = useState('');

	const handleSubmit = async(e)=> {
		e.preventDefault();
		const raw = await fetch('http://localhost:3030/user/passwordReset', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Email: Email,
				VerifyKey: VerifyKey,
				Password: Password,
				RePassword: RePassword,
			}),
		});

		const data = await raw.json();

		if (data.error != null) {
			console.log(data.error);
		}
	};

	const resendEmail = async () => {
		const raw = await fetch ('http://localhost:3030/user/passwordReset/email', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				Email: Email,
			}),
		});

		const data = await raw.json;
		if (data.error != null) {
			console.log(data.error);
		}
	}

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
							Password Reset
						</Typography>
					</Grid>

					<Grid item style={{width: '100%'}}>
						<form onSubmit={(e)=> handleSubmit(e)}>
							<TextField
								required
								label="Email"
								type="input"
								color="primary"
								onChange={(e)=> setEmail(e.target.value)}
							/>
							<TextField
								label="Security Key"
								type="input"
								color="primary"
								onChange={(e)=> setKey(e.target.value)}
							/>
							<TextField
								label="Password"
								type="password"
								color="primary"
								onChange={(e)=> setPwd(e.target.value)}
							/>
							<TextField
								label="Retype Password"
								type="password"
								color="primary"
								onChange={(e)=> setRePwd(e.target.value)}
							/>
							<Button
								fullWidth 
								type="submit" 
								variant="contained"
								className={classes.button}
							>
								Verify
							</Button>
							<Button
								fullWidth 
								variant="contained"
								className={classes.button}
								onClick={()=> resendEmail()}
							>
								Resend Email
							</Button>
						</form>
					</Grid>
				</Grid>
			</Paper>
		</Grid>
	);
}

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
	button: {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
		marginTop: theme.spacing(2),
 	},
	item: {
		width: '90%',
	},
	link: {
		textDecoration: 'none',
		marginTop: theme.spacing(2),
	},
});

export default withStyles(styles)(PasswordReset);