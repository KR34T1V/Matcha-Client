import React, { useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import { NavLink } from 'react-router-dom';

const Connexions = ({ classes, accessToken, expiredToken }) => {
	const [cons, setCons] = useState([]);
	const [load, setLoad] = useState(false);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		const fetchCons = async () => {
			setLoad(true);
			const raw = await fetch(
				`http://localhost:3030/user/connexions?AccessToken=${accessToken}`,
			);
			const { data } = await raw.json();
			if (data.res === 'Error' && data.errors > 0) {
				if (data.errors[0] === 'AccessToken Expired') {
					expiredToken();
				} else setErrors(data.errors);
			} else if (data.res === 'Success' && data.Connexions != null) {
				setCons(data.Connexions);
				setLoad(false);
			} else setErrors(['Network Error']);
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
			{errors.map((msg) => (
				<Grid item>
					<Typography key={msg} variant="body1" color="secondary">
						{msg}
					</Typography>
				</Grid>
			))}
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
