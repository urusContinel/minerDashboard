import * as React from 'react';
import * as redux from '@exldev/redux';
import {
	ThemeProvider,
	responsiveFontSizes,
	createTheme,
} from '@mui/material/styles';
import { ruRU } from '@mui/material/locale';
import { useDispatch, useSelector } from 'react-redux';
import LayoutWrapper from './LayoutWrapper';

const LightStyledTheme = responsiveFontSizes(
	createTheme({ palette: { mode: 'light' } }, ruRU)
);
const DarkStyledTheme = responsiveFontSizes(
	createTheme({ palette: { mode: 'dark' } }, ruRU)
);

export default function ThemeWrapper({ Component, pageProps, pageTitleData }) {
	const dispatch = useDispatch();
	const mode = useSelector(redux.selectors.getDarkMode);
	const [theme, setTheme] = React.useState(LightStyledTheme);
	React.useEffect(() => {
		dispatch(redux.action.loadDarkMode);
		setTheme(mode === 'light' ? LightStyledTheme : DarkStyledTheme);
	}, [dispatch, mode]);
	return (
		<ThemeProvider theme={theme}>
			<LayoutWrapper
				Component={Component}
				pageProps={pageProps}
				pageTitleData={pageTitleData}
			/>
		</ThemeProvider>
	);
}
