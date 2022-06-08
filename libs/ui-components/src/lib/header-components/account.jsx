import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useDispatch, useSelector } from 'react-redux';
import { selectors, action } from '@exldev/redux';

export default function Account({ isMenuItem = false }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const user = useSelector(selectors.getUser);
	const dispatch = useDispatch();
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};
	const Logout = () => {
		dispatch(action.LogOut);
		setAnchorEl(null);
	};
	const menuId = 'primary-search-account-menu';
	const name =
		user !== undefined && user !== null && Object.keys(user).length > 0
			? `{user.surname} {user.name}`
			: '';
	return (
		<>
			{!isMenuItem && (
				<IconButton
					size='large'
					edge='end'
					aria-label='account of current user'
					aria-controls={menuId}
					aria-haspopup='true'
					onClick={handleProfileMenuOpen}
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
			)}
			{isMenuItem && (
				<MenuItem disableRipple onClick={handleProfileMenuOpen}>
					<ListItemIcon>
						<AccountCircle />
					</ListItemIcon>
					<ListItemText>{name}</ListItemText>
				</MenuItem>
			)}

			<Menu
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				id={menuId}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={isMenuOpen}
				onClose={handleMenuClose}
			>
				<MenuItem onClick={Logout}>Log out</MenuItem>
			</Menu>
		</>
	);
}
