import React from 'react';
import { NavLink } from 'react-router-dom';
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

const People = ({ classes }) => {
	const tempProfile = {
		username: 'RespectfulCat',
		first: 'Insecure',
		last: 'Band',
		gender: 'Male',
		preference: 'Bisexual',
		age: moment('2012-05-14T22:00:00.000Z').year(),
		bio:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
		tags: ['Bicycle', 'Dare', 'Independent', 'Western', 'Literature'],
		geo:
			'{"Latitude":-29,"Longitude":28,"Timestamp":"2020/06/06, 16:59:06"}', // don't need this for pass grade...
		fame: '110',
		mainImg: 'https://picsum.photos/400/250?random=3185',
		otherImg: [
			'https://picsum.photos/400/250?random=5320',
			'https://picsum.photos/400/250?random=38',
			'https://picsum.photos/400/250?random=4007',
			'https://picsum.photos/400/250?random=6555',
			'https://picsum.photos/400/250?random=1546',
			'https://picsum.photos/400/250?random=9175',
		],
		lastOnline: moment('2020/05/06 16:44:22').fromNow(),
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
							{tempProfile.username}
						</Typography>
					</Grid>

					<Typography variant="h6" align="center" color="primary">
						Last online: {tempProfile.lastOnline}
					</Typography>

					<Grid item className={classes.item}>
						<Grid container justify="center">
							<img
								src={tempProfile.mainImg}
								alt="profile"
								style={{ borderRadius: '10px' }}
							/>
						</Grid>
					</Grid>

					<Grid item className={classes.item}>
						<Grid container justify="space-evenly">
							{tempProfile.otherImg.map((img) => (
								<img
									src={img}
									alt="profile"
									className={classes.otherImg}
									style={{ borderRadius: '10px' }}
								/>
							))}
						</Grid>
					</Grid>

					<Grid item className={classes.item}>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Fame: {tempProfile.fame}
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							{tempProfile.first} {tempProfile.last}
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Gender: {tempProfile.gender}
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Sexual Orientation: {tempProfile.preference}
						</Typography>

						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Date of Birth: {tempProfile.age}
						</Typography>
					</Grid>
					<Grid item className={classes.item}>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							{tempProfile.bio}
						</Typography>
					</Grid>

					<Grid item className={classes.item}>
						<Typography
							variant="h5"
							align="center"
							color="primary"
						>
							Likes
						</Typography>
						<Grid container justify="space-evenly">
							{tempProfile.tags.map((tag) => (
								<Grid item>
									<Typography variant="h6" color="primary">
										{tag}
									</Typography>
								</Grid>
							))}
						</Grid>
					</Grid>

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
								Back To Home
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
