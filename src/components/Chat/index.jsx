import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';

const Chat = ({ classes }) => {
	const [ret, setRet] = useState('');
	const [messages, setMessages] = useState([]);
	let i = 0;

	const getChat = () => {
		setTimeout(async () => {
			await callChat();
			getChat();
		}, 5000);
	};

	const callChat = async () => {
		if (i < 5) {
			const raw = await fetch('http://localhost:8000/');
			const data = await raw.json();
			setRet(data.data);
		}
		i++;
	};

	useEffect(() => {
		callChat();
		getChat();

		let arr = [];
		for (let x = 0; x < 10; x++) {
			arr.push({
				message: 'Hello poes',
				id: x,
			});
		}
		setMessages(arr);
	}, []);

	return (
		<Grid
			container
			justify="center"
			direction="column"
			className={classes.content}
			spacing={2}
		>
			{messages.map((item) => (
				<Paper key={item.id} elevation={4} className={classes.paper}>
					<Typography
						variant="body1"
						align={item.id % 2 === 0 ? 'left' : 'right'}
					>
						{item.message}
					</Typography>
				</Paper>
			))}
		</Grid>
	);
};

const styles = (theme) => ({
	spacing: {
		margin: theme.spacing(1),
	},
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
});

export default withStyles(styles)(Chat);
