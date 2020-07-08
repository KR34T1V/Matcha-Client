import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import BlockIcon from '@material-ui/icons/Block';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ReportIcon from '@material-ui/icons/ReportOutlined';

const People = ({ classes, accessToken, expiredToken }) => {
	const [userProfile, setProfile] = useState({});
	const [Liked, setLiked] = useState();
	const [Blocked, setBlocked] = useState();
	const [errors, setErrors] = useState([]);
	const { id: personId } = useParams();

	const likeUser = async () => {
		const raw = await fetch('http://localhost:3030/user/like', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				AccessToken: accessToken,
				profileId: personId,
			}),
		});

		const { data } = await raw.json();

		if (data.res === 'Error' && data.errors > 0) {
			if (data.errors[0] === 'AccessToken Expired') {
				expiredToken();
			} else setErrors(data.errors);
		} else if (data.res === 'Success' && data.msg != null) {
			data.msg === 'Liked User' ? setLiked(true) : setLiked(false);
		}
	};

	const blockUser = async (report) => {
		if (report === 1 && Blocked === true) return 0;
		const raw = await fetch('http://localhost:3030/user/block', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				AccessToken: accessToken,
				profileId: personId,
			}),
		});
		const { data } = await raw.json();
		if (data.res === 'Error' && data.errors > 0) {
			if (data.errors[0] === 'AccessToken Expired') {
				expiredToken();
			} else setErrors(data.errors);
		} else if (data.res === 'Success' && data.msg != null) {
			data.msg === 'Blocked User'
				? setBlocked(true)
				: setBlocked(false);
		}
	};
	useEffect(() => {
		const getProfiles = async () => {
			const raw = await fetch(
				`http://localhost:3030/view/profile?AccessToken=${accessToken}&ProfileId=${personId}`,
			);

			const { data } = await raw.json();
			if (data.res === 'Error' && data.errors != null && data.errors.length > 0) {
				if (data.errors[0] === 'AccessToken Expired') {
					if (data.errors[0] === 'AccessToken Expired') {
						expiredToken();
					} else setErrors(data.errors);
				} else setErrors(data.errors);
			} else if (data.res === 'Success' && data.user != null) {
				const { user } = data;

				setLiked(user.Liked);
				setBlocked(user.Blocked);
				setProfile({
					...user,
					LastOnline: moment(user.AccessTime).fromNow(),
				});
			} else setErrors(['Network Error']);
		};

		getProfiles();
	}, []);

	return (
		<Grid
			container
			justify="center"
			direction="column"
			className={classes.content}
		>
			<Paper elevation={4} className={classes.paper}>
				<Grid container justify="center" spacing={4}>
					<Grid item className={classes.item}>
						<Typography
							variant="h4"
							align="center"
							color="primary"
						>
							{userProfile.Username}
						</Typography>
					</Grid>

					<Typography variant="h6" align="center" color="primary">
						Last online: {userProfile.LastOnline}
					</Typography>
					{userProfile.Avatar != null ? (
						<Grid item className={classes.item}>
							<Grid container justify="center">
								<img
									src={userProfile.Avatar}
									alt="profile"
									style={{ borderRadius: '10px' }}
								/>
							</Grid>
						</Grid>
					) : null}
					{userProfile.Images != null &&
					userProfile.Images.length > 0 ? (
						<Grid item className={classes.item}>
							<Grid container justify="space-evenly">
								{userProfile.Images.map((file, l) => (
									<img
										src={file}
										alt="profile"
										key={`Profile-${l}`}
										className={classes.otherImg}
										style={{ borderRadius: '10px' }}
									/>
								))}
							</Grid>
						</Grid>
					) : null}

					<Grid item className={classes.item}>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Fame: {userProfile.Fame}%
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							{userProfile.Firstname} {userProfile.Lastname}
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Gender: {userProfile.Gender}
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Sexuality: {userProfile.Sexuality}
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Age: {userProfile.Age}
						</Typography>
					</Grid>
					<Grid item className={classes.item}>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							{userProfile.Biography}
						</Typography>
					</Grid>
					{userProfile.Interests != null &&
					userProfile.Interests.length > 0 ? (
						<Grid item className={classes.item}>
							<Typography
								variant="h5"
								align="center"
								color="primary"
							>
								Interests:
							</Typography>
							<Grid container justify="space-evenly">
								{userProfile.Interests.map((tag) => (
									<Grid item key={tag}>
										<Typography
											variant="h6"
											color="primary"
										>
											{tag}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Grid>
					) : null}

					{errors.map((msg) => (
						<Grid item>
							<Typography
								key={msg}
								variant="body1"
								color="primary"
							>
								{msg}
							</Typography>
						</Grid>
					))}

					<Grid item className={classes.item}>
						{Liked === false ? (
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
								onClick={() => likeUser()}
							>
								<ThumbUpIcon
									color="secondary"
									className={classes.buttonText}
								/>
								Like
							</Button>
						) : (
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
								onClick={() => likeUser()}
							>
								<ThumbDownIcon
									color="secondary"
									className={classes.buttonText}
								/>
								Dislike
							</Button>
						)}
						{Blocked === false ? (
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
								onClick={() => blockUser()}
							>
								<BlockIcon
									color="secondary"
									className={classes.buttonText}
								/>
								Block
							</Button>
						) : (
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
								onClick={() => blockUser()}
							>
								<LockOpenIcon
									color="secondary"
									className={classes.buttonText}
								/>
								Unblock
							</Button>
						)}

						<Button
							fullWidth
							type="submit"
							variant="contained"
							className={classes.button}
							onClick={() => blockUser(1)}
						>
							<ReportIcon
								color="secondary"
								className={classes.buttonText}
							/>
							Report
						</Button>

						<NavLink to="/">
							<Button
								fullWidth
								type="submit"
								variant="contained"
								className={classes.button}
							>
								Back to Home
							</Button>
						</NavLink>
					</Grid>
				</Grid>
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
		width: '90%',
	},
	button: {
		color: theme.palette.secondary.main,
		backgroundColor: theme.palette.primary.main,
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	link: {
		textDecoration: 'none',
		marginTop: theme.spacing(2),
	},
	linkText: {
		width: '10%',
		marginLeft: '45%',
		'&:hover': {
			borderBottom: `1px dotted ${theme.palette.secondary.main}`,
		},
	},
	radioTitle: {
		borderBottom: `1px dotted ${theme.palette.primary.main}`,
	},
	buttonText: {
		marginRight: theme.spacing(1),
	},
	otherImg: {
		width: '30%',
		marginBottom: theme.spacing(2),
	},
});

export default withStyles(styles)(People);
