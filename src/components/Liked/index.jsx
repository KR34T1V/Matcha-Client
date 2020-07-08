import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const Liked = ({ classes, accessToken, expiredToken }) => {
	const [likers, setLikers] = useState('');
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const getLikes = async () => {
			const raw = await fetch(
				`http://localhost:3030/getProfileLikes?AccessToken=${accessToken}`,
			);
			const { data } = await raw.json();
			if (data.res === 'Error' && data.errors.length > 0) {
				if (data.errors[0] === 'AccessToken Expired') {
					expiredToken();
				} else setErrors(data.errors);
			} else if (data.Likers != null) {
				setLikers(data.Likers);
			} else setErrors(['Network Error']);
		};

		getLikes();
	}, [accessToken]);

	return (
		<Grid
			container
			justify="center"
			direction="column"
			className={classes.content}
		>
			<Paper elevation={4} className={classes.paper}>
				<Typography variant="h4" align="center" color="primary">
					Likers
				</Typography>

				{errors.map((msg) => (
					<Grid item>
						<Typography key={msg} variant="body1" color="primary">
							{msg}
						</Typography>
					</Grid>
				))}

				{likers === '' ? (
					<CircularProgress variant="indeterminate" />
				) : likers.length > 0 ? (
					<Grid>
						{likers.map((liker) => {
							return (
								<NavLink
									to={`/people/${liker.Id}`}
									className={classes.link}
								>
									<Grid
										container
										key={liker.Id}
										direction="column"
										className={classes.item}
									>
										<Grid item>
											<Typography
												variant="h6"
												color="primary"
												align="center"
											>
												{liker.Username}
											</Typography>
										</Grid>
										<Grid item>
											<Typography
												variant="body1"
												color="primary"
												align="center"
											>
												Fame Rating: {liker.Fame}
											</Typography>
										</Grid>
									</Grid>
								</NavLink>
							);
						})}
						<NavLink to="/profile">
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
							>
								Back
							</Button>
						</NavLink>
					</Grid>
				) : (
					<Grid>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							No Likers yet...
						</Typography>
						<NavLink to="/profile">
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
							>
								Back
							</Button>
						</NavLink>
					</Grid>
				)}
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
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			marginLeft: '0',
		},
	},
	button: {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	item: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		width: '80%',
		marginLeft: '10%',
		border: `1px solid ${theme.palette.primary.main}`,
		borderRadius: 15,
	},
	link: {
		textDecoration: 'none',
	},
});

export default withStyles(styles)(Liked);
