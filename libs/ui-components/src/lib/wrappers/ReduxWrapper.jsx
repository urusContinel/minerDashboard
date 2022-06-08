import { Provider } from 'react-redux';
import * as redux from '@exldev/redux';
import  PrivateRouter  from './PrivateRouterWrapper';

export default function ReduxWrapper({ Component, pageProps, pageTitleData }) {
	const store = redux.store.useStore(pageProps.store);
	return (
		<Provider store={store}>
			<PrivateRouter Component={Component} pageProps={pageProps} pageTitleData={pageTitleData}/>
		</Provider>
	);
}
