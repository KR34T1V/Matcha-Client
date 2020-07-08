import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import NotificationIcon from '@material-ui/icons/NotificationsActiveOutlined';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const NotificationMenu = ({ classes, expiredToken }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const [notifications, setNotif] = useState([]);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const getNotifications = () => {
		const accToken = localStorage.getItem('accessToken');
		if (
			accToken !== 'null' &&
			accToken != null &&
			accToken !== 'undefined'
		) {
			setTimeout(async () => {
				await callNotifications(accToken);
				getNotifications();
			}, 5000);
		}
	};

	const callNotifications = async (accToken) => {
		const raw = await fetch(
			`http://localhost:3030/user/notifications?AccessToken=${accToken}`,
		);
		const { data } = await raw.json();
		if (data.res === 'Error' && data.errors.length > 0) {
			if (data.errors[0] === 'AccessToken Expired') {
				expiredToken();
			} else setNotif(data.errors);
		} else if (
			data.notifications != null &&
			data.notifications.length > 0
		) {
			setNotif(data.notifications);
		} else setNotif([]);
	};

	useEffect(() => {
		callNotifications();
		getNotifications();
	}, []);

	return (
		<div>
			<NotificationIcon
				color="secondary"
				onClick={handleClick}
				style={{ marginTop: '4px', cursor: 'pointer' }}
			/>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				PaperProps={{
					style: {
						backgroundColor: '#df0203',
					},
				}}
				style={{ width: '100%' }}
			>
				<Grid container direction="column" spacing={2}>
					{notifications.length === 0 ? (
						<Grid item style={{ margin: '16px' }}>
							<Typography
								variant="h6"
								color="primary"
								align="center"
							>
								No notifications
							</Typography>
						</Grid>
					) : (
						notifications.map(
							({ Avatar, Username, Id, Message }) => (
								<Grid item onClick={handleClose} key={Id}>
									<NavLink
										to={`/chat/${Id}`}
										className={classes.link}
									>
										<Grid
											container
											justify="center"
											spacing={0}
										>
											<Grid
												item
												style={{ width: '35%' }}
											>
												<img
													src={Avatar}
													alt="Avatar"
													className={classes.img}
												/>
											</Grid>

											<Grid
												item
												style={{ width: '45%' }}
											>
												<Typography
													variant="body1"
													color="primary"
												>
													{Username} {Message}
												</Typography>
											</Grid>
										</Grid>
									</NavLink>
								</Grid>
							),
						)
					)}
				</Grid>
			</Menu>
		</div>
	);
};

const styles = (theme) => ({
	img: {
		width: '60%',
	},
	link: {
		textDecoration: 'none',
	},
	hover: {
		'&:hover': {
			border: `1px dashed ${theme.palette.primary.main}`,
		},
	},
});

export default withStyles(styles)(NotificationMenu);
