import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

const Profile = ({ classes, accessToken }) => {
	const [username, setUsername] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [preference, setPreference] = useState('');
	const [avatar, setAvatar] = useState('');
	const [otherImg, setOtherImg] = useState([]);
	const [myTags, setMyTags] = useState([]);
	const [allTags, setAllTags] = useState([]);

	const [pwd, setPwd] = useState('');
	const [npwd, setNPwd] = useState('');
	const [repwd, setRePwd] = useState('');



	useEffect(() => {
		const getCurrentUser = async () => {
			const raw = await fetch(
				`http://localhost:3030/user/profile?AccessToken=${accessToken}`,
			);
			const data = await raw.json();
			if (data.data != null){
				const profile = data.data;
				setUsername(profile.Username);
				setFirst(profile.Firstname);
				setLast(profile.Lastname);
				setEmail(profile.Email);
				setGender(profile.Gender);
				setPreference(profile.SexualPreference);
				if (profile.Avatar != null)
					setAvatar(profile.Avatar);
				if (profile.Images != null && profile.Images.length > 0)
					setOtherImg(profile.Images);
				setMyTags(profile.Interests);
			}
		};
		getCurrentUser();
	}, [accessToken]);

	const handleGender = (event) => {
		setGender(event.target.value);
	};

	const handlePreference = (event) => {
		setPreference(event.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const addTag = (e) => {
		const item = e.target.value;

		if (item != null) {
			const temp = [...myTags, item];
			console.log(temp);
			setMyTags(temp);
		}
	};
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
							Your Profile
						</Typography>
					</Grid>

					{username !== '' ? (
						<>
							<Grid item className={classes.item}>
								<Grid
									container
									justify="center"
									style={{ marginTop: '12px' }}
								>
								{console.log(avatar)}
								{avatar !== '' ? (
									<img
										src={avatar}
										alt="avatar"
										style={{
											borderRadius: '10px',
											marginBottom: '16px',
										}}
									/>
								): (null)}
									<Typography
										variant="subtitle2"
										align="center"
										color="primary"
									>
										This is where the avatar upload is meant to be
									</Typography>
								</Grid>
							</Grid>

							<Grid item className={classes.item}>
								<Grid container justify="space-evenly">
									{otherImg.map((img) => (
										<img
											src={img}
											alt="other"
											className={classes.otherImg}
											style={{ borderRadius: '10px' }}
										/>
									))}
								</Grid>
								<Typography
									variant="subtitle2"
									align="center"
									color="primary"
								>
									This is where the other image upload is meant to be 
								</Typography>
							</Grid>

							<Grid item className={classes.item}>
								<form onSubmit={(e) => handleSubmit(e)}>
									<TextField
										required
										fullWidth
										label="Username"
										type="input"
										color="primary"
										onChange={(e) =>
											setUsername(e.target.value)
										}
										value={username}
									/>
									<TextField
										required
										fullWidth
										label="First Name"
										type="input"
										color="primary"
										onChange={(e) =>
											setFirst(e.target.value)
										}
										value={first}
									/>
									<TextField
										required
										fullWidth
										label="Last Name"
										type="input"
										color="primary"
										onChange={(e) =>
											setLast(e.target.value)
										}
										value={last}
									/>
									<TextField
										required
										fullWidth
										label="Email"
										type="email"
										color="primary"
										onChange={(e) =>
											setEmail(e.target.value)
										}
										value={email}
									/>
									<Grid container justify="space-evenly">
										<Grid item>
											<Typography
												variant="h6"
												align="center"
												className={classes.radioTitle}
											>
												Gender
											</Typography>
											<RadioGroup
												aria-label="gender"
												value={gender}
												onChange={handleGender}
											>
												<FormControlLabel
													value="Female"
													control={
														<Radio color="primary" />
													}
													label="Female"
												/>
												<FormControlLabel
													value="Male"
													control={
														<Radio color="primary" />
													}
													label="Male"
												/>
											</RadioGroup>
										</Grid>
										<Grid item>
											<Typography
												variant="h6"
												align="center"
												className={classes.radioTitle}
											>
												Preference
											</Typography>
											<RadioGroup
												aria-label="preference"
												value={preference}
												onChange={handlePreference}
											>
												<FormControlLabel
													value="Homosexual"
													control={
														<Radio color="primary" />
													}
													label="Homosexual"
												/>
												<FormControlLabel
													value="Heterosexual"
													control={
														<Radio color="primary" />
													}
													label="Heterosexual"
												/>
												<FormControlLabel
													value="Bisexual"
													control={
														<Radio color="primary" />
													}
													label="Bisexual"
												/>
											</RadioGroup>
										</Grid>
									</Grid>

									<Grid item>
										<Grid
											container
											justify="space-evenly"
										>
											{allTags.map((tag) => (
												<Grid item>
													<FormControlLabel
														value={tag}
														control={
															<Checkbox
																color="primary"
																checked={
																	myTags.indexOf(
																		tag,
																	) !== -1
																		? true
																		: false
																}
															/>
														}
														label={tag}
														onClick={(e) =>
															addTag(e)
														}
													/>
												</Grid>
											))}
										</Grid>
									</Grid>

									<Button
										fullWidth
										type="submit"
										variant="contained"
										className={classes.button}
									>
										Save Changes
									</Button>
									<TextField
										fullWidth
										label="Current Password"
										type="password"
										color="primary"
										onChange={(e) =>
											setPwd(e.target.value)
										}
									/>
									<TextField
										fullWidth
										label="New Password"
										type="password"
										color="primary"
										onChange={(e) =>
											setNPwd(e.target.value)
										}
									/>
									<TextField
										fullWidth
										label="Repeat New Password"
										type="password"
										color="primary"
										onChange={(e) =>
											setRePwd(e.target.value)
										}
									/>
									<Button
										fullWidth
										type="submit"
										variant="contained"
										className={classes.button}
									>
										Change your password
									</Button>

									<NavLink to={`/viewed`}>
										<Button
											fullWidth
											type="submit"
											variant="contained"
											className={classes.button}
										>
											See Who viewed Me?
										</Button>
									</NavLink>

									<NavLink to={`/liked`}>
										<Button
											fullWidth
											type="submit"
											variant="contained"
											className={classes.button}
										>
											See Who Liked Me?
										</Button>
									</NavLink>

									<NavLink to="/">
										<Button
											fullWidth
											type="submit"
											variant="contained"
											className={classes.button}
										>
											Back To Home
										</Button>
									</NavLink>
								</form>
							</Grid>
						</>
					) : (
						<Grid item>
							<CircularProgress variant="indeterminate" />
						</Grid>
					)}
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
	otherImg: {
		width: '30%',
		marginBottom: theme.spacing(2),
	},
});

export default withStyles(styles)(Profile);
