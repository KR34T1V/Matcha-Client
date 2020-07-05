import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import { NavLink } from 'react-router-dom';

const Connexions = ({ classes, accessToken }) => {
	const [cons, setCons] = useState([]);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		const fetchCons = async () => {
			setLoad(true);
			const raw = await fetch(
				`http://localhost:3030/user/connexions?AccessToken=${accessToken}`,
			);
			const data = await raw.json();
			setCons(data.data.Connexions);
			setLoad(false);
		};

		fetchCons();
	}, [accessToken]);

	return (
		<Grid
			container
			direction="column"
			spacing={2}
			style={{ marginTop: '16px' }}
		>
			{load === false && cons.length > 0 ? (
				cons.map((item) => (
					<Grid item key={item.Id}>
						<Paper elevation={2} className={classes.paper}>
							<NavLink
								to={`chat/${item.Id}`}
								className={classes.link}
							>
								<Typography
									variant="h6"
									align="center"
									color="primary"
								>
									{item.Username}
								</Typography>
							</NavLink>
						</Paper>
					</Grid>
				))
			) : load === true ? (
				<CircularProgress variant="indeterminate" color="secondary" />
			) : (
				<Typography variant="h5" align="center" color="secondary">
					No Connexions yet...
				</Typography>
			)}
		</Grid>
	);
};

const styles = (theme) => ({
	spacing: {
		margin: theme.spacing(2),
	},
	link: {
		textDecoration: 'none',
	},
	paper: {
		backgroundColor: theme.palette.secondary.main,
		width: '25%',
		marginLeft: '37.5%',
		[theme.breakpoints.down('sm')]: {
			width: '80%',
			marginLeft: '10%',
		},
	},
});

export default withStyles(styles)(Connexions);
