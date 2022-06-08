import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from 'react-redux';
import { DARK_MODE_CHANGED } from '@exldev/redux';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

const DarkModeButton = ({ small = true, isMenuItem = false }) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	let Icon = <Brightness7Icon />;
	if (theme.palette.mode === 'dark') {
		Icon = <Brightness7Icon />;
	} else {
		Icon = <Brightness4Icon />;
	}
	const DarkMode = () =>{console.log('Click DarkMode!'); dispatch({ type: DARK_MODE_CHANGED, payload: '' })};
	return isMenuItem ? (
		<MenuItem onClick={DarkMode}>
			<ListItemIcon>{Icon}</ListItemIcon>

			<ListItemText>Темный режим</ListItemText>
		</MenuItem>
	) : small ? (
		<IconButton
			size='large'
			color='inherit'
			sx={{ margin: 'auto' }}
			onClick={DarkMode}
		>
			{Icon}
		</IconButton>
	) : (
		<Button startIcon={Icon} onClick={DarkMode}>
			Темный режим
		</Button>
	);
};
export default DarkModeButton;
