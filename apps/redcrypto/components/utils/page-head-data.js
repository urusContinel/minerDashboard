const pageTitleData = {
	page: {
		Login: {
			head: false,
			title: 'Login',
			description: 'Login Page',
			href: '/login',
			ItemList: {
				client: false,
				admin: false,
			},
		},
		AdminDashboard: {
			head: true,
			title: ' Admin Dashboard',
			description: 'Dashboard page',
			href: '/admin/dashboard',
			ItemList: {
				client: false,
				admin: true,
			},
		},
		AdminMiners: {
			head: true,
			title: ' Admin MinersList',
			description: 'MinersList page',
			href: '/admin/miners',
			ItemList: {
				client: false,
				admin: true,
			},
		},
		AdminModels: {
			head: true,
			title: ' Admin Miner Models List',
			description: 'Miner Models List page',
			href: '/admin/models',
			ItemList: {
				client: false,
				admin: true,
			},
		},
		AdminClient: {
			head: true,
			title: ' Admin ClientList',
			description: 'ClientList page',
			href: '/admin/client',
			ItemList: {
				client: false,
				admin: true,
			},
		},
		ClientDashboard: {
			head: true,
			title: 'ClientDashboard',
			description: 'ClientDashboard page',
			href: '/client/dashboard',
			ItemList: {
				client: false,
				admin: false,
			},
		},
		index: {
			head: false,
			title: 'Main',
			description: 'Main Page',
			href: '/',
			ItemList: {
				client: false,
				admin: false,
			},
		},
		_error: {
			head: true,
			title: 'Error',
			description: 'Error Page',
			ItemList: {
				client: false,
				admin: false,
			},
		},
	},
};
export default pageTitleData;
