import React, { useEffect, useState } from 'react';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const Home = ({ classes, accessToken }) => {
	const [profiles, setProfiles] = useState([]);

	useEffect(() => {
		const getProfiles = async () => {
			const raw = await fetch(
				`http://localhost:3030/home?AccessToken=${accessToken}`,
			);
			const data = await raw.json();
			if (data.data != null && data.data.length > 0) {
				setProfiles(data.data);
			}
		};

		getProfiles();
	}, []);

	return (
		<>
			{profiles.map(
				({
					Username,
					Firstname,
					Lastname,
					Id,
					Avatar,
					FameRating,
					Age,
					Biography,
				}) => (
					<Grid
						container
						justify="center"
						direction="column"
						className={classes.content}
						key={Id}
					>
						<Paper elevation={4} className={classes.paper}>
							<Grid container justify="center" spacing={2}>
								<Grid item className={classes.item}>
									<Typography
										variant="h4"
										align="center"
										color="primary"
									>
										{Username}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<Grid container justify="center">
										<img
											src={Avatar}
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
										Fame: {FameRating.toFixed(2)}%
									</Typography>
								</Grid>
								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										Name: {Firstname} {Lastname}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										Age: {Age}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										{Biography}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<NavLink to={`/people/${Id}`}>
										<Button
											fullWidth
											variant="contained"
											className={classes.button}
										>
											View Profile
										</Button>
									</NavLink>
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
				),
			)}
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
