import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Chat = ({ classes, accessToken }) => {
	const { id } = useParams();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [currentId, setCId] = useState(id);
	const [uid, setUsername] = useState('');

	const getChat = () => {
		if (currentId != null) {
			setTimeout(async () => {
				await callChat();
				getChat();
			}, 5000);
		}
	};

	const callChat = async () => {
		if (currentId != null) {
			const raw = await fetch(
				`http://localhost:3030/user/chat?AccessToken=${accessToken}&Id=${currentId}`,
			);
			const data = await raw.json();
			const { Chat, Username } = data.data;
			setMessages(Chat);
			setUsername(Username);
			console.log(Username);
		}
	};

	const submit = async () => {
		const raw = await fetch('http://localhost:3030/user/chat/new', {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				AccessToken: accessToken,
				To: currentId,
				Message: message,
			}),
		});
		const data = await raw.json();
		if (data.errors == null) {
			setMessage('');
			setMessages(data.data.Messages);
		}
	};

	useEffect(() => {
		callChat();
		getChat();

		return () => {
			setCId(null);
		};
	}, []);

	return (
		<Grid
			container
			justify="center"
			direction="column"
			className={classes.content}
			spacing={4}
		>
			<Grid item>
				<Typography variant="h4" align="center" color="secondary">
					{uid}
				</Typography>
			</Grid>
			<Grid item>
				{messages.length === 0 ? (
					<Typography variant="h5" align="center" color="secondary">
						No Messages Yet
					</Typography>
				) : (
					<Grid container justify="center" spacing={2}>
						{messages.map((item, l) => (
							<Grid item style={{ width: '80%' }}>
								<Paper
									key={item.id}
									elevation={4}
									className={classes.paper}
								>
									<Typography
										variant="body1"
										align={
											item.FromId === Number(currentId)
												? 'left'
												: 'right'
										}
									>
										{item.Message}
									</Typography>
								</Paper>
							</Grid>
						))}
					</Grid>
				)}
			</Grid>

			<Grid
				container
				justify="space-evenly"
				style={{ marginTop: '16px' }}
			>
				<TextField
					className={classes.tfield}
					value={message}
					placeholder="Type your message here"
					onChange={(e) => setMessage(e.target.value)}
					color="secondary"
					style={{ width: '80%' }}
				/>
				<Button
					color="secondary"
					variant="outlined"
					onClick={() => submit()}
				>
					Send
				</Button>
			</Grid>
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
		width: '70%',
		marginLeft: '15%',
		[theme.breakpoints.down('sm')]: {
			width: '90%',
			marginLeft: '0',
		},
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
	},
});

export default withStyles(styles)(Chat);
