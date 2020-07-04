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

const Profile = ({ classes, accessToken, errors, setErrors }) => {
	const [username, setUsername] = useState('');
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [email, setEmail] = useState('');
	const [gender, setGender] = useState('');
	const [preference, setPreference] = useState('');
	const [avatar, setAvatar] = useState('');
	const [avatarPreview, setAvatarPreview] = useState('');
	const [otherImg, setOtherImg] = useState([]);
	const [myTags, setMyTags] = useState([]);
	const [allTags, setAllTags] = useState([]);

	const [pwd, setPwd] = useState('');
	const [npwd, setNPwd] = useState('');
	const [repwd, setRePwd] = useState('');

	const uploadAvatar = async function (img){
		setAvatarPreview(img);
		let form = new FormData();
		form.append('AccessToken', accessToken);
		form.append('Avatar', img);

		var request = new XMLHttpRequest();
		request.open("POST", 'http://localhost:3030/user/updateProfile/avatar');
		request.send(form);
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200){
				let data = JSON.parse(request.response);
				if (data != null && data.data.Avatar != null)
					setAvatar(data.data.Avatar);
			}
		}
	}

	const uploadGallery = async function (key, img){
		setAvatarPreview(img)
		let form = new FormData();
		form.append('AccessToken', accessToken);
		form.append('Key', key);
		form.append('Image', img);

		var request = new XMLHttpRequest();
		request.open("POST", 'http://localhost:3030/user/updateProfile/gallery');
		request.send(form);
		request.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200){
				let data = JSON.parse(request.response);
				if (data != null && data.data.Images != null)
					setOtherImg(data.data.Images);
			}
		}
	}

	const saveProfile = async function () {
		const raw = await fetch('http://localhost:3030/user/updateProfile', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				AccessToken: accessToken,
				Avatar: avatar,
				Username: username,
				Firstname: first,
				Lastname: last,
				Gender: gender,
				SexualPreference: preference,
			}),
		});
		const data = await raw.json();
		console.log(data);
	}
	const submitPwdChange = async function () {
		const raw = await fetch('http://localhost:3030/user/passwordChange', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				AccessToken: accessToken,
				Password: pwd,
				NewPassword: npwd,
				RePassword: repwd,
			}),
		});
		const data = await raw.json();
		if (data.data != null && data.data.errors != null && data.data.errors.length > 0)
			setErrors(data.data.errors);
		if (data.data != null && data.data.result === 'Success'){
			console.log(data.data.Result);
		} else {
			setErrors(["Network Error"]);
		}
	}



	useEffect(() => {
		const getCurrentUser = async () => {
			const raw = await fetch(
				`http://localhost:3030/user/profile?AccessToken=${accessToken}`,
			);
			const data = await raw.json();
			if (data.data != null){
				if (data.data.errors != null && data.data.errors.length > 0){
					setErrors(data.data.errors);
				}
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
								{avatar !== '' ? (
									<img
										src={avatar}
										alt="avatar"
										style={{
											borderRadius: '10px',
											marginBottom: '16px',
										}}
									/>
								): (avatarPreview !== '' ? (
									<img
										src={URL.createObjectURL(avatarPreview)}
										alt="avatar"
										style={{
											borderRadius: '10px',
											marginBottom: '16px',
										}}
									/>
								): (null))}
								<input type="file" name="avatar" onChange={(e)=>{
									uploadAvatar(e.target.files[0]);
									}
								}/>
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
										onClick={() => saveProfile()}
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
										onClick={() => submitPwdChange()}
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
