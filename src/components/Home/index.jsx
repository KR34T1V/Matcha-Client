import React, { useEffect, useState } from 'react';

// MaterialUI
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Pagination from '@material-ui/lab/Pagination';
import { Select, MenuItem } from '@material-ui/core';

const Home = ({ classes, accessToken, setErrors, errors }) => {
	const [unfilteredProfiles, setUnfilteredProfiles] = useState([]);
	const [profiles, setProfiles] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [ageRange, setAgeRange] = useState([18, 100]);
	const [currentPage, setCurrentPage] = useState(1);
	const [maxPages, setMaxPages] = useState(1);
	const [maxResults, setMaxResults] = useState(5);
	const [sortValue, setSortValue] = useState('Username')

	useEffect(() => {
		const getProfiles = async () => {
			const raw = await fetch(
				`http://localhost:3030/home?AccessToken=${accessToken}`,
			);
			const data = await raw.json();
			if (
				data.data != null &&
				data.data.errors != null &&
				data.data.errors.length > 0
			)
				setErrors(errors);
			if (data.data != null && data.data.length > 0) {
				setUnfilteredProfiles(data.data);
				setProfiles(data.data.sort((a,b) => (a.Username > b.Username) ? 1 : ((b.Username > a.Username) ? -1 : 0)));
				setMaxPages(data.data.length/maxResults);
			}
		};

		getProfiles();
	}, [accessToken, setErrors, errors]);

	function updateProfiles() {
		setProfiles(unfilteredProfiles.filter((data) => {
			if((data.Firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
				data.Lastname.toLowerCase().includes(searchTerm.toLowerCase()) || 
				data.Username.toLowerCase().includes(searchTerm.toLowerCase())) &&
				(data.Age >= ageRange[0] && data.Age <= ageRange[1])){
				return data
			} else {
				return null
			}
		}))
		setMaxPages(profiles.length/maxResults)
	}

	function handleChange(e) {
		if (e.target.name === "searchInput") {
			setSearchTerm(e.target.value)
		}
	}

	return (
		<>
		<form className={classes.root} noValidate autoComplete="off">
			<TextField
				label="Search: "
				type="input"
				className={classes.tfield}
				name="searchInput"
				onChange={handleChange}
			/>
			<div className={classes.slider}>
			<Typography id="range-slider" 
					gutterBottom
					color="secondary"
					>
				Age range
			</Typography>
			<Slider
				name="ageRange"
				value={ageRange}
				onChange={(e, age) => setAgeRange(age)}
				min={18}
				step={1}
				valueLabelDisplay="auto"
				aria-labelledby="range-slider"
				getArialValueText={ageRange}
				/>
			<Button
			color="secondary"
			variant="outlined"
			onClick={updateProfiles}>
				Filter
				</Button>
				<Select
					value={sortValue}
					className={classes.tfield}
					onChange={(e) => setSortValue(e.target.value)}>
					<MenuItem value={'Username'}>Username</MenuItem>
					<MenuItem value={'Age'}>Age</MenuItem>
				</Select>
			</div>
				</form>
			{profiles.sort((a,b) => (a[sortValue] > b[sortValue]) ? 1 : ((b[sortValue] > a[sortValue]) ? -1 : 0))
			.slice((currentPage-1)*maxResults, currentPage*maxResults).map(
				({
					Username,
					Firstname,
					Lastname,
					Id,
					Avatar,
					FameRating,
					Age,
					Biography,
				}) => (
					<Grid
						container
						justify="center"
						direction="column"
						className={classes.content}
						key={Id}
					>
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
						<Paper elevation={4} className={classes.paper}>
							<Grid container justify="center" spacing={2}>
								<Grid item className={classes.item}>
									<Typography
										variant="h4"
										align="center"
										color="primary"
									>
										{Username}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<Grid container justify="center">
										<img
											src={Avatar}
											alt="profile"
											style={{ borderRadius: '10px' }}
										/>
									</Grid>
								</Grid>

								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										Fame: {FameRating.toFixed(2)}%
									</Typography>
								</Grid>
								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										Name: {Firstname} {Lastname}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										Age: {Age}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<Typography
										variant="h6"
										align="center"
										color="primary"
									>
										{Biography}
									</Typography>
								</Grid>

								<Grid item className={classes.item}>
									<NavLink to={`/people/${Id}`}>
										<Button
											fullWidth
											variant="contained"
											className={classes.button}
										>
											View Profile
										</Button>
									</NavLink>
								</Grid>
							</Grid>
						</Paper>
					</Grid>
				),
			)}

			<Pagination count={maxPages}
			variant="outlined"
			color="primary"
			justify="center"
			className={classes.pagenumber}
			onChange={(e, page) => setCurrentPage(page)}/>
		</>
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
	tfield: {
		'& label.Mui-focused': {
			color: theme.palette.secondary.main,
		},
		'& label': {
			color: theme.palette.secondary.main,
		},
		'& .MuiInputBase-input': {
			color: theme.palette.secondary.main,
		},
		'& .MuiInput-underline:before': {
			borderBottomColor: theme.palette.secondary.main,
		},
		'& .MuiInput-underline:after': {
			borderBottomColor: theme.palette.secondary.main,
		},
		'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
			borderBottomColor: theme.palette.secondary.main,
		},
		'& .MuiSelect-icon': {
			color: theme.palette.secondary.main,
		},
	},
	slider: {
		width: 300,
		'& .MuiSlider-thumb': {
			color: theme.palette.secondary.main,
		},
		'& .MuiSlider-track': {
			color: theme.palette.secondary.main,
		},
	},
	pagenumber: {
		'& .MuiPagination-ul': {
			backgroundColor: theme.palette.secondary.main,
		},
	},
});

export default withStyles(styles)(Home);
