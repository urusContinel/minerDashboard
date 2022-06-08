import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled, lighten } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectors } from '@exldev/redux';
import Link from 'next/link';

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
}));

export default function LeftMenu({ itemList }) {
	const [OpenLeftMenu, setOpenLeftMenu] = React.useState(false);
	const user = useSelector(selectors.getUser);
	let userRole;
	const router = useRouter();
	const toggleDrawer = (open) => (event) => {
		if (
			event &&
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}
		setOpenLeftMenu(open);
	};
	if (user !== undefined && user !== null && Object.keys(user).length > 0) {
		userRole = user.__typename;

		return (
			<>
				<IconButton
					size='large'
					edge='start'
					color='inherit'
					aria-label='menu'
					sx={{ mr: 2 }}
					onClick={toggleDrawer(true)}
				>
					<MenuIcon />
				</IconButton>
				<SwipeableDrawer
					anchor='left'
					open={OpenLeftMenu}
					onClose={toggleDrawer(false)}
					onOpen={toggleDrawer(true)}
				>
					<Box sx={{ width: 250 }}>
						<DrawerHeader />
						<List
							sx={{
								width: '100%',
								maxWidth: 250,
								bgcolor: 'background.paper',
								height: 'calc( 100vh - 80px )',
							}}
							component='nav'
						>
							{Object.keys(itemList).map((i) => {
								let a = itemList[i];
								if (a.ItemList[userRole]) {
									return (
										<Link href={a.href} key={a.href}>
											<ListItemButton
												selected={
													router.pathname === a.href
												}
												key={a.href}
												sx={{ color: 'text' }}
											>
												<ListItemText
													primary={a.title}
													primaryTypographyProps={{
														color: 'text',
														fontWeight: 'medium',
														variant: 'body2',
													}}
												/>
											</ListItemButton>
										</Link>
									);
								}
							})}
						</List>
					</Box>
				</SwipeableDrawer>
			</>
		);
	} else {
		return '';
	}
}
