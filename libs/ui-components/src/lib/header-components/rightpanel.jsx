import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import Account from './account';
import DarkModeButton from '../DarkModeButton';

export default function RightPanel() {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const mobileMenuId = 'primary-search-account-menu-mobile';
	return (
		<Box>
			<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
				<DarkModeButton />
				<Account />
			</Box>
			<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
				<IconButton
					size='large'
					aria-label='show more'
					aria-controls={mobileMenuId}
					aria-haspopup='true'
					onClick={handleMobileMenuOpen}
					color='inherit'
					sx={{ ml: 1, height: 'fit-content', margin: 'auto' }}
				>
					<MoreIcon />
				</IconButton>
				<Menu
					anchorEl={mobileMoreAnchorEl}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					id={mobileMenuId}
					keepMounted
					transformOrigin={{
						vertical: 'top',
						horizontal: 'right',
					}}
					open={isMobileMenuOpen}
					onClose={handleMobileMenuClose}
				>
					<DarkModeButton isMenuItem={true} />
					<Account isMenuItem={true} />
				</Menu>
			</Box>
		</Box>
	);
}
