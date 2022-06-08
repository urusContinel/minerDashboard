import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import ThemeWrapper from './ThemeWrapper';
import { selectors, action } from '@exldev/redux';

const admin = 'admin';
const client = 'client';

export default function PrivateRouter({ Component, pageProps, pageTitleData }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const issetUser = useSelector(selectors.getUser);
	let section = router.pathname.slice(1).split('/')[0];
	const [Returned, setReturned] = React.useState('');
	React.useEffect(() => {
		if (router.pathname === '/') {
			setReturned(
				<ThemeWrapper
					Component={Component}
					pageProps={pageProps}
					pageTitleData={pageTitleData}
				/>
			);
		} else {
			if (
				issetUser &&
				issetUser !== undefined &&
				Object.keys(issetUser).length > 0
			) {
				const UserRole = issetUser.__typename;
				//Пользователь есть в redux/localstorage и его время еще не истекло по токену
				let role;

				switch (UserRole) {
					case 'admin': {
						role = admin;
						break;
					}
					case 'client': {
						role = client;
						break;
					}
				}

				if (section === role) {
					setReturned(
						<ThemeWrapper
							Component={Component}
							pageProps={pageProps}
							pageTitleData={pageTitleData}
						/>
					);
				} else {
					router.push(`/${role}/dashboard`);
				}
			} else {
				// Пользователя нет, редирект на страницу авторизации, если не на ней.
				if (section !== `login`) {
					/* console.log('section !== `login`', section !== `login`); */
					router.push(`/login`);
				} else {
					/* console.log('1'); */
					setReturned(
						<ThemeWrapper
							Component={Component}
							pageProps={pageProps}
							pageTitleData={pageTitleData}
						/>
					);
				}
			}
		}
	}, [Component, dispatch, issetUser, pageProps, pageTitleData, router, section]);
	return Returned;
}
