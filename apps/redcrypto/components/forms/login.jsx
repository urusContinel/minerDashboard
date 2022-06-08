import React from 'react';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { DarkModeButton } from '@exldev/redcrypto-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { action, selectors } from '@exldev/redux';

export default function FormLogin() {
	const dispatch = useDispatch();

	const username = useSelector(selectors.getUserName);
	const password = useSelector(selectors.getPassword);
	const loading = useSelector(selectors.getLoading);
	const disabled = useSelector(selectors.getDisabledButton);
	const alert = useSelector(selectors.getAlert);
	const colorTextFields = useSelector(selectors.getColorTextField);
	const disabledTextFields = useSelector(selectors.getDisabledTextField);
	const usernameAutocomplete = React.useRef(null);
	const passwordAutocomplete = React.useRef(null);



	const handleSubmit = () => {
		dispatch(action.authUser(username, password));
	};

 	React.useEffect(() => {
		let usernameInterval = setInterval(() => {
			if (usernameAutocomplete.current) {
				dispatch(
					action.changeUserName(
						String(usernameAutocomplete.current.value)
					)
				);
				clearInterval(usernameInterval);
			}
		}, 100);
		let passwordInterval = setInterval(() => {
			if (passwordAutocomplete.current) {
				dispatch(
					action.changePassword(
						String(passwordAutocomplete.current.value)
					)
				);
				clearInterval(passwordInterval);
			}
		}, 100);
	}); 

	return (
		<Card>
			<CardContent>
				<TextField
					inputRef={usernameAutocomplete}
					label='Username'
					id='username'
					variant='standard'
					fullWidth
					margin='normal'
					type='text'
					color={`${colorTextFields}`}
					value={username}
					onChange={(e) => {
						dispatch(action.changeUserName(String(e.target.value)));
					}}
					disabled={disabledTextFields}
				/>
				<TextField
					inputRef={passwordAutocomplete}
					label='Password'
					id='password'
					variant='standard'
					fullWidth
					margin='normal'
					type='password'
					color={colorTextFields}
					value={password}
					onChange={(e) => {
						dispatch(action.changePassword(String(e.target.value)));
					}}
					disabled={disabledTextFields}
				/>
				<Stack sx={{ width: '100%' }} spacing={2}>
					<Alert severity={alert.type}>
						<AlertTitle>{alert.title}</AlertTitle>
						{alert.text}
					</Alert>
				</Stack>
			</CardContent>
			<CardActions
				sx={{
					justifyContent: 'space-around',
				}}
			>
				<DarkModeButton />
				<LoadingButton
					disabled={disabled}
					loading={loading}
					variant='outlined'
					size='large'
					color={colorTextFields}
					onClick={() => {
						handleSubmit();
					}}
				>
					Log In
				</LoadingButton>
			</CardActions>
		</Card>
	);
}
