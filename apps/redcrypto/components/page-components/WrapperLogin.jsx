import React from 'react';
import FormLogin from '../forms/login';
import Grid from '@mui/material/Grid';

export default function WrapperLogin() {
	return (
		<Grid
			container
			direction='row'
			justifyContent='center'
			alignItems='center'
			spacing={3}
			sx={{ height: '100vh' }}
		>
			<Grid item xs='auto' sx={{ maxWidth: '300px' }}>
				<FormLogin />
			</Grid>
		</Grid>
	);
}
