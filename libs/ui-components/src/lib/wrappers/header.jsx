import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import RightPanel from '../header-components/rightpanel';
import LeftMenu from '../header-components/leftmenu';

export default function Head({ currentPage, MenuList }) {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='fixed'>
				<Toolbar>
					<LeftMenu itemList={MenuList} />
					<Typography
						variant='h6'
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						{currentPage.title}
					</Typography>
					<Box sx={{ flexGrow: 1 }} />
					<RightPanel />
				</Toolbar>
			</AppBar>
		</Box>
	);
}
