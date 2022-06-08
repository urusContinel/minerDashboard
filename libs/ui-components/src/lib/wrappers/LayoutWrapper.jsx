import * as React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Head from './header';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { selectors, action } from '@exldev/redux';

const Layout = styled(Box)(({ theme, head }) => ({
	background: theme.palette.background.default,
	marginTop: head ? 56 : 0,
	minHeight: head ? `calc( 100vh - 56px )` : `100vh`,
	overflowY: `hidden`,
	overflowX: `hidden`,
	[theme.breakpoints.up('sm')]: {
		marginTop: head ? 64 : 0,
		minHeight: head ? `calc( 100vh - 64px )` : `100vh`,
	},
}));

export default function LayoutWrapper({ Component, pageProps, pageTitleData }) {
	const router = useRouter();
	const dispatch = useDispatch();
	const tick = useSelector(selectors.getTick);

	const issetUser = useSelector(selectors.getUser);

	const AdminClientRowsLastUpdate = useSelector(
		selectors.getAdminClientRowsLastUpdate
	);
	const MinerRowsLastUpdate = useSelector(selectors.getMinerRowsLastUpdate);
	const MinerModelRowsLastUpdate = useSelector(
		selectors.getMinerModelRowsLastUpdate
	);

	const AdminClientRowsLoading = useSelector(
		selectors.getAdminClientRowsLoading
	);
	const MinerRowsLoading = useSelector(selectors.getMinerRowsLoading);
	const MinerModelRowsLoading = useSelector(
		selectors.getMinerModelRowsLoading
	);

	let page = router.pathname
		.slice(1)
		.split('/')
		.map((i) => i.charAt(0).toUpperCase() + i.slice(1))
		.join('');
	if (page === '') page = 'index';
	const data = pageTitleData.page[page];
	const { head } = data;
	React.useEffect(() => {
		console.log(1);
		if (
			page !== 'Login' &&
			issetUser &&
			issetUser !== undefined &&
			Object.keys(issetUser).length > 0
		) {
			const UserRole = issetUser.__typename;
			if (UserRole === 'admin') {
				if (
					!AdminClientRowsLoading &&
					(AdminClientRowsLastUpdate === 0 ||
						(tick - AdminClientRowsLastUpdate) / 1000 > 600)
				) {
					console.log('start update Client Rows!', tick);
					dispatch(action.getClientAsync());
				}
				if (
					!MinerRowsLoading &&
					(MinerRowsLastUpdate === 0 ||
						(tick - MinerRowsLastUpdate) / 1000 > 600)
				) {
					console.log('start update Miner Rows!', tick);
					dispatch(action.getMinerAsync());
				}
				if (
					!MinerModelRowsLoading &&
					(MinerModelRowsLastUpdate === 0 ||
						(tick - MinerModelRowsLastUpdate) / 1000 > 600)
				) {
					console.log('start update MinerModel Rows!', tick);
					dispatch(action.changeMinerModelRows());
				}
			}
			setTimeout(() => {
				dispatch(action.tick);
			}, 600000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ tick, issetUser]);

	return (
		<Layout head={head}>
			{head && <Head currentPage={data} MenuList={pageTitleData.page} />}
			<Component {...pageProps} />
		</Layout>
	);
}
