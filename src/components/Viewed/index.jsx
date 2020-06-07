import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

const Viewed = ({ classes, match }) => {
	const id = match.params.id;
	const [viewers, setViewers] = useState('');

	useEffect(() => {
		const fetchViewed = async () => {
			const raw = await fetch(
				`http://localhost:8000/getProfileViews?id=${id}`,
			);
			const data = await raw.json();
			setViewers(data.data);
		};
		fetchViewed();
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
					Viewers
				</Typography>
				{viewers === '' ? (
					<CircularProgress variant="indeterminate" />
				) : viewers.length > 0 ? (
					viewers.map((viewer) => {
						return (
							<NavLink
								to={`/people/${viewer.Id}`}
								className={classes.link}
							>
								<Grid
									container
									key={viewer.Id}
									direction="column"
									className={classes.item}
								>
									<Grid item>
										<Typography
											variant="h6"
											color="primary"
											align="center"
										>
											{viewer.Username}
										</Typography>
									</Grid>
									<Grid item>
										<Typography
											variant="body1"
											color="primary"
											align="center"
										>
											Fame Rating: {viewer.Fame}
										</Typography>
									</Grid>
								</Grid>
							</NavLink>
						);
					})
				) : (
					<Typography variant="h5" align="center" color="primary">
						No Viewers yet...
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

export default withStyles(styles)(Viewed);
