import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import moment from 'moment';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import BlockIcon from '@material-ui/icons/Block';
import ReportIcon from '@material-ui/icons/ReportOutlined';

const People = ({ classes, accessToken, errors, setErrors }) => {
	const [userProfile, setProfile] = useState({});
	//Do errors
	const {id: personId} = useParams()

	useEffect(() => {
		const getProfiles = async () => {
			const raw = await fetch(
				`http://localhost:3030/view/profile?AccessToken=${accessToken}&ProfileId=${personId}`,
			);
			const data = await raw.json();
			if (data.data != null) {
				let user = data.data;
				console.log(user.Interests);
				let profile = {};
				if (data.data.errors != null) {
					setErrors(data.data.errors);
				}
				profile.Username = user.Username;
				profile.Firstname = user.Firstname;
				profile.Lastname = user.Lastname;
				profile.Gender = user.Gender;
				profile.Sexuality = user.SexualPreference;
				profile.Age = user.Age;
				profile.Biography = user.Biography;
				profile.Interests = user.Interests;
				profile.Fame = user.Fame;
				profile.Avatar = user.Avatar;
				profile.Images = user.Images;
				profile.LastOnline = moment(user.AccessTime).fromNow();
				setProfile(profile);
			};
		}
		getProfiles();
	}, [accessToken, personId, setErrors]);
	
	return (
		<Grid
			container
			justify="center"
			direction="column"
			className={classes.content}
		>
			<Paper elevation={4} className={classes.paper}>
				<Grid container justify="center" spacing={4}>
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
					{userProfile.Avatar != null ? 
					<Grid item className={classes.item}>
						<Grid container justify="center">
							<img
								src={userProfile.Avatar}
								alt="profile"
								style={{ borderRadius: '10px' }}
							/>
						</Grid>
					</Grid>
					: (null)
					}
					{userProfile.Images != null && userProfile.Images.length > 0 ?
						<Grid item className={classes.item}>
							<Grid container justify="space-evenly">
								{userProfile.Images.map((file) => (
									<img
										src={file}
										alt="profile"
										className={classes.otherImg}
										style={{ borderRadius: '10px' }}
									/>
								))}
							</Grid>
						</Grid> : (null)
					}

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
					{userProfile.Interests != null && userProfile.Interests.length > 0 ?
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
									<Grid item>
										<Typography variant="h6" color="primary">
											{tag}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Grid> : (null)
					}

					<Grid item className={classes.item}>
						<Button
							fullWidth
							type="submit"
							variant="contained"
							className={classes.button}
						>
							<FavoriteBorderIcon
								color="secondary"
								className={classes.buttonText}
							/>
							Like
						</Button>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							className={classes.button}
						>
							<BlockIcon
								color="secondary"
								className={classes.buttonText}
							/>
							Block
						</Button>

						<Button
							fullWidth
							type="submit"
							variant="contained"
							className={classes.button}
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
