import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Liked = ({ classes, match }) => {
	const id = match.params.id;
	const [likers, setLikers] = useState('');

	useEffect(() => {
		const getLikes = async () => {
			const raw = await fetch(
				`http://localhost:8000/getProfileLikes?id=${id}`,
			);
			const data = await raw.json();
			setLikers(data.data);
		};
		getLikes();
	}, []);

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
				{likers === '' ? (
					<CircularProgress variant="indeterminate" />
				) : likers.length > 0 ? (
					likers.map((liker) => {
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
					})
				) : (
					<Typography variant="h5" align="center" color="primary">
						No Likers yet...
					</Typography>
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
