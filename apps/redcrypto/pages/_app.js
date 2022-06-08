import { ReduxWrapper } from '@exldev/redcrypto-ui-components';
import pageTitleData from '../components/utils/page-head-data';
import './styles.css';

function CustomApp({ Component, pageProps }) {
	return (
		<ReduxWrapper
			Component={Component}
			pageProps={pageProps}
			pageTitleData={pageTitleData}
		/>
	);
}

export default CustomApp;
