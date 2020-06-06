import React from 'react';

// Material UI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { NavLink } from 'react-router-dom';

const Taskbar = ({ isLoggedIn, classes }) => {
	return isLoggedIn ? (
		<AppBar position="sticky" elevation={0} className={classes.ruler}>
			<Toolbar variant="dense">
				<Grid container justify="space-between">
					<Grid item className={classes.title}>
						<NavLink to="/" className={classes.link}>
							<Typography variant="h5" color="secondary">
								<b>Matcha</b>
							</Typography>
						</NavLink>
					</Grid>
					<Grid item className={classes.right}>
						<Grid container justify="space-evenly">
							<Grid item className={classes.title}>
								<NavLink to="/chats" className={classes.link}>
									<Typography
										variant="h6"
										color="secondary"
									>
										Chats
									</Typography>
								</NavLink>
							</Grid>
							<Grid item className={classes.title}>
								<NavLink to="/" className={classes.link}>
									<Typography
										variant="h6"
										color="secondary"
									>
										Log Out
									</Typography>
								</NavLink>
							</Grid>
							<Grid item>
								<NavLink to="profile">
									<IconButton>
										<AccountCircle color="secondary" />
									</IconButton>
								</NavLink>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	) : (
		<AppBar position="sticky" elevation={0} className={classes.ruler}>
			<Toolbar variant="dense">
				<Grid container justify="space-between">
					<Grid item>
						<NavLink to="/" className={classes.link}>
							<Typography variant="h5" color="secondary">
								<b>Matcha</b>
							</Typography>
						</NavLink>
					</Grid>
					<Grid item className={classes.right}>
						<Grid container justify="space-evenly">
							<Grid item>
								<NavLink to="login" className={classes.link}>
									<Typography
										variant="h6"
										color="secondary"
									>
										Log In
									</Typography>
								</NavLink>
							</Grid>

							<Grid item>
								<NavLink to="signup" className={classes.link}>
									<Typography
										variant="h6"
										color="secondary"
									>
										Register
									</Typography>
								</NavLink>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

const styles = (theme) => ({
	title: {
		marginTop: theme.spacing(),
	},
	link: {
		textDecoration: 'none',
	},
	ruler: {
		borderBottom: `1px solid ${theme.palette.secondary.main}`,
	},
	right: {
		[theme.breakpoints.up('sm')]: {
			width: '15%',
		},
		[theme.breakpoints.down('sm')]: {
			width: '50%',
		},
	},
});

export default withStyles(styles)(Taskbar);
