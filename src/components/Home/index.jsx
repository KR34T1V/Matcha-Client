import React, { useEffect, useState } from 'react';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const Home = ({ classes }) => {
	const [profiles, setProfiles] = useState([]);

	const profile = {
		username: "cterblan's GF",
		first: 'Corry',
		last: "Terblanche's GF",
		email: 'cterblan@student.wethinkcode.co.za',
		gender: 'male',
		preference: 'women',
	};

	useEffect(() => {
		const func = async () => {
			// const data = await fetch('http://localhost:3030/login');
			fetch("http://localhost:3030/login", {
				method: "post",
				headers: {
				  'Accept': 'application/json',
				  'Content-Type': 'application/json'
				},
			  
				//make sure to serialize your JSON body
				body: JSON.stringify({
				  Email: "LonelyPony@dispostable.com",
				  Password: "ebolastic"
				})
			  })
			  .then( (response) => { 
				console.log(response);
				 //do something awesome that makes the world a better place
			  });
			  

			// console.log(data);
		};
	
		func();
	
		const arr = [];
		for (let x = 0; x < 10; x++) {
			arr.push(profile);
		}
	
		setProfiles(arr);
	}, []);

	return (
		<>
			{profiles.map(({ username, first, last }, i) => (
				<Grid
					container
					justify="center"
					direction="column"
					className={classes.content}
				>
					<Paper elevation={4} className={classes.paper}>
						<Grid container justify="center" spacing={2}>
							<Grid item className={classes.item}>
								<Typography
									variant="h4"
									align="center"
									color="primary"
								>
									{username}
								</Typography>
							</Grid>

							<Grid item className={classes.item}>
								<Grid container justify="center">
									<img
										src={`https://picsum.photos/400/250?random=${i}`}
										alt="profile"
										style={{ borderRadius: '10px' }}
									/>
								</Grid>
							</Grid>

							<Grid item className={classes.item}>
								<Typography
									variant="h6"
									align="center"
									color="primary"
								>
									Fame: 110%
								</Typography>
							</Grid>
							<Grid item className={classes.item}>
								<Typography
									variant="h6"
									align="center"
									color="primary"
								>
									Name: {first} {last}
								</Typography>
							</Grid>

							<Grid item className={classes.item}>
								<Typography
									variant="h6"
									align="center"
									color="primary"
								>
									Age: 21
								</Typography>
							</Grid>

							<Grid item className={classes.item}>
								<Typography
									variant="h6"
									align="center"
									color="primary"
								>
									It is a long established fact that a
									reader will be distracted by the readable
									content of a page when looking at its
									layout.
								</Typography>
							</Grid>

							<Grid item className={classes.item}>
								<Button
									fullWidth
									variant="contained"
									className={classes.button}
								>
									View Profile
								</Button>
								<Button
									fullWidth
									variant="contained"
									className={classes.button}
								>
									Yes please!
								</Button>
							</Grid>
						</Grid>
					</Paper>
				</Grid>
			))}
		</>
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
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
});

export default withStyles(styles)(Home);
