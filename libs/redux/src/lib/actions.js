import axios from 'axios';
import * as jwt from '@exldev/jwt';
import * as types from './types';
import * as gql from './graphqlSchema';

// ACTIONS CORE
export const changeDarkMode = { type: types.DARK_MODE_CHANGED, payload: '' };
export const loadDarkMode = { type: types.DARK_MODE_LOAD, payload: '' };

export const tick = { type: types.TICK, payload: '' };
//ACTIONS USER
export const LogOut = { type: types.LOG_OUT, payload: '' };

//ACTIONS FORM LOGIN
export const changeUserName = (username) => (dispatch, getState) => {
	const state = getState();
	const password = state.login.password;
	const disabledButton = state.login.disabledButton;
	let disabled_button = true;
	if (
		username !== '' &&
		username.length >= 6 &&
		password !== '' &&
		password.length >= 6
	) {
		disabled_button = false;
	}
	dispatch({
		type: types.FORM_LOGIN_USERNAME_CHANGED,
		payload: username,
	});

	if (disabledButton !== disabled_button) {
		dispatch(changeDisabledButton(disabled_button));
	}
};
export const changePassword = (password) => (dispatch, getState) => {
	const state = getState();
	const username = state.login.username;
	const disabledButton = state.login.disabledButton;
	let disabled_button = true;
	if (
		username !== '' &&
		username.length >= 6 &&
		password !== '' &&
		password.length >= 6
	) {
		disabled_button = false;
	}
	dispatch({
		type: types.FORM_LOGIN_PASSWORD_CHANGED,
		payload: password,
	});
	if (disabledButton !== disabled_button) {
		dispatch(changeDisabledButton(disabled_button));
	}
};

export const changeLoading = (v) => ({
	type: types.FORM_LOGIN_LOADING_CHANGED,
	payload: v,
});
export const changeDisabledButton = (v) => ({
	type: types.FORM_LOGIN_DISABLED_BUTTON_CHANGED,
	payload: v,
});

export const changeAlert = (v) => (dispatch) => {
	let colorTextField;
	switch (v.types) {
		case 'info': {
			colorTextField = 'primary';
			break;
		}
		case 'success': {
			colorTextField = 'success';
			break;
		}
		case 'error': {
			colorTextField = 'error';
			break;
		}
		default: {
			colorTextField = 'primary';
			break;
		}
	}
	dispatch({
		type: types.FORM_LOGIN_ALERT_CHANGED,
		payload: v,
	});
	dispatch(changeColorTextField(colorTextField));
};
export const changeColorTextField = (v) => ({
	type: types.FORM_LOGIN_COLOR_TEXTFIELDS_CHANGED,
	payload: v,
});
export const changeDisabledTextField = (v) => ({
	type: types.FORM_LOGIN_DISABLED_TEXTFIELDS_CHANGED,
	payload: v,
});

//ACTIONS ADMIN TABLE CLIENTS
export const changeTableClientSortModel = (v) => ({
	type: types.TABLE_CLIENT_SORT_MODEL_CHANGED,
	payload: v,
});
export const changeTableClientPinnedColumns = (v) => ({
	type: types.TABLE_CLIENT_PINNED_COLUMNS_CHANGED,
	payload: v,
});
export const changeTableClientRows = (v) => ({
	type: types.TABLE_CLIENT_ROWS_CHANGED,
	payload: v,
});
export const changeTableClientRowsLoading = (v) => ({
	type: types.TABLE_CLIENT_ROWS_LOADING_CHANGED,
	payload: v,
});
export const changeTableClientRowsLastUpdate = (v) => ({
	type: types.TABLE_CLIENT_ROWS_LAST_UPDATE_CHANGED,
	payload: v,
});
export const changeTableClientColumns = (v) => ({
	type: types.TABLE_CLIENT_COLUMNS_CHANGED,
	payload: v,
});

//ACTIONS TABLE MINERS
export const changeTableMinerSortModel = (v) => ({
	type: types.TABLE_MINER_SORT_MODEL_CHANGED,
	payload: v,
});
export const changeTableMinerPinnedColumns = (v) => ({
	type: types.TABLE_MINER_PINNED_COLUMNS_CHANGED,
	payload: v,
});
export const changeTableMinerRows = (v) => ({
	type: types.TABLE_MINER_ROWS_CHANGED,
	payload: v,
});
export const changeTableMinerRowsLoading = (v) => ({
	type: types.TABLE_MINER_ROWS_LOADING_CHANGED,
	payload: v,
});
export const changeTableMinerRowsLastUpdate = (v) => ({
	type: types.TABLE_MINER_ROWS_LAST_UPDATE_CHANGED,
	payload: v,
});
export const changeTableMinerColumns = (v) => ({
	type: types.TABLE_MINER_COLUMNS_CHANGED,
	payload: v,
});

//ACTIONS TABLE MINERMODELS
export const changeTableMinerModelSortModel = (v) => ({
	type: types.TABLE_MINER_MODEL_SORT_MODEL_CHANGED,
	payload: v,
});
export const changeTableMinerModelPinnedColumns = (v) => ({
	type: types.TABLE_MINER_MODEL_PINNED_COLUMNS_CHANGED,
	payload: v,
});
export const changeTableMinerModelRows = (v) => ({
	type: types.TABLE_MINER_MODEL_ROWS_CHANGED,
	payload: v,
});
export const changeTableMinerModelRowsLoading = (v) => ({
	type: types.TABLE_MINER_MODEL_ROWS_LOADING_CHANGED,
	payload: v,
});
export const changeTableMinerModelRowsLastUpdate = (v) => ({
	type: types.TABLE_MINER_MODEL_ROWS_LAST_UPDATE_CHANGED,
	payload: v,
});
export const changeTableMinerModelColumns = (v) => ({
	type: types.TABLE_MINER_MODEL_COLUMNS_CHANGED,
	payload: v,
});

//INITIALIZES CORE ON SERVER
export const serverRenderCore = () => (dispatch) => dispatch(loadDarkMode);

//thunk
const headers = { 'content-type': 'application/json' };
const URL = 'http://localhost:666/v1';

export const authUser = (username, password) => async (dispatch) => {
	dispatch(changeLoading(true));
	dispatch(changeDisabledTextField(true));
	const graphqlQuery = {
		operationName: 'Authorization',
		query: gql.Authorization,
		variables: {
			username: username,
			password: password,
		},
	};

	const token = jwt.sign(graphqlQuery);
	await axios({
		baseURL: URL,
		url: '/api',
		method: 'post',
		headers: headers,
		data: { token: token },
	})
		.then((response) => {
			let user = response.data.data.user;

			if (Object.keys(user).length > 0) {
				if (user.__typename !== 'error') {
					dispatch(
						changeAlert({
							types: 'success',
							message: user.username,
						})
					);
					dispatch({
						type: types.LOG_IN,
						payload: response.data.data.user,
					});
					/* setTimeout(() => {
						let router = useRouter();
						router.reload();
					}, 3000); */
				} else {
					dispatch(
						changeAlert({
							types: 'error',
							message: user.errorText,
						})
					);
				}
			} else {
				dispatch(
					changeAlert({
						types: 'error',
						message: 'data not send',
					})
				);
			}
			dispatch(changeDisabledTextField(false));
			dispatch(changeLoading(false));
		})
		.catch((err) => {
			/* dispatch(changeDisabledTextField(false));
				dispatch(changeLoading(false)); */
			console.log(err);
			dispatch(
				changeAlert({
					types: 'error',
					message: 'server not found',
				})
			);
		});
};

export const getClientAsync =
	(client = '') =>
	async (dispatch) => {
		dispatch(changeTableClientRowsLoading(true));
		let graphqlQuery;
		if (client === '') {
			graphqlQuery = {
				query: gql.AllClients,
			};
		} else {
			graphqlQuery = {
				operationName: 'OneClient',
				query: gql.OneClient,
				variables: {
					username: client,
				},
			};
		}
		const token = jwt.sign(graphqlQuery);
		await axios({
			baseURL: URL,
			url: '/api',
			method: 'post',
			headers: headers,
			data: { token: token },
		})
			.then((response) => {
				let client = response.data.data.client;
				let date = Date.now();
				setTimeout(() => {
					dispatch(changeTableClientRows(client));
					dispatch(changeTableClientRowsLoading(false));
					dispatch(changeTableClientRowsLastUpdate(date));
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
			});
	};
export const getMinerAsync = () => async (dispatch) => {
	dispatch(changeTableMinerRowsLoading(true));
	let graphqlQuery = {
		query: gql.Miner,
	};
	const token = jwt.sign(graphqlQuery);
	await axios({
		baseURL: URL,
		url: '/api',
		method: 'post',
		headers: headers,
		data: { token: token },
	})
		.then((response) => {
			let miners = response.data.data.asic;
			let date = Date.now();
			setTimeout(() => {
				dispatch(changeTableMinerRows(miners));
				dispatch(changeTableMinerRowsLoading(false));
				dispatch(changeTableMinerRowsLastUpdate(date));
			}, 2000);
		})
		.catch((err) => {
			console.log(err);
		});
};

export const upsertMinerRows = (v) => async (dispatch, getState) => {
	dispatch(changeTableMinerRowsLoading(true));
	const state = getState();
	let miners =
		state.tableMiner.rows !== undefined &&
		typeof state.tableMiner.rows === 'string'
			? JSON.parse(state.tableMiner.rows)
			: state.tableMiner.rows;

	const graphqlQuery = {
		operationName: 'UpsertMiner',
		query: gql.UpsertMiner,
		variables: v,
	};

	const token = jwt.sign(graphqlQuery);
	await axios({
		baseURL: URL,
		url: '/api',
		method: 'post',
		headers: headers,
		data: { token: token },
	}).then((response) => {
		const NewMiner = response.data.data.UpsertMiner;
		let payload;
		let date = Date.now();
		if (Object.prototype.hasOwnProperty.call(v, 'id')) {
			void Object.keys(miners).map((i) => {
				if (miners[i].id === v.id) {
					miners[i].workerId = v.workerId;
					miners[i].name = v.name;
					miners[i].serial = v.serial;
					miners[i].model = v.model;
					miners[i].status = v.status;
					miners[i].createdAt = v.createdAt;
					miners[i].updatedAt = v.updatedAt;
					miners[i].ClientId = v.ClientId;
				}
				return '';
			});
			payload = miners;
		} else {
			payload = [...miners, NewMiner];
		}
		setTimeout(() => {
			dispatch(changeTableMinerRows(payload));
			dispatch(changeTableMinerRowsLoading(false));
			dispatch(changeTableMinerRowsLastUpdate(date));
		}, 2000);
	});
};

export const changeMinerModelRows =
	(v = '') =>
	async (dispatch, getState) => {
		const state = getState();
		let models =
			state.tableMinerModel.rows !== undefined &&
			typeof state.tableMinerModel.rows === 'string'
				? JSON.parse(state.tableMinerModel.rows)
				: state.tableMinerModel.rows;
		dispatch(changeTableMinerModelRowsLoading(true));
		let graphqlQuery;
		if (v === '') {
			graphqlQuery = {
				operationName: 'MinerModels',
				query: gql.MinerModels,
			};
		} else {
			graphqlQuery = {
				operationName: 'UpsertMinerModels',
				query: gql.UpsertMinerModels,
				variables: v,
			};
		}

		const token = jwt.sign(graphqlQuery);
		await axios({
			baseURL: URL,
			url: '/api',
			method: 'post',
			headers: headers,
			data: { token: token },
		})
			.then((response) => {
				let type = graphqlQuery.operationName;
				let minerModels = response.data.data[type];
				let date = Date.now();
				let payload;
				if (type === 'MinerModels') {
					payload = minerModels;
				}
				if (type === 'UpsertMinerModels') {
					if (Object.prototype.hasOwnProperty.call(v, 'id')) {
						void Object.keys(models).map((i) => {
							if (models[i].id === v.id) {
								models[i].name = v.name;
								models[i].ComputingPower = v.ComputingPower;
								models[i].UsagePower = v.UsagePower;
							}
							return '';
						});
						payload = models;
					} else {
						payload = [...models, minerModels];
					}
				}
				setTimeout(() => {
					dispatch(changeTableMinerModelRows(payload));
					dispatch(changeTableMinerModelRowsLoading(false));
					dispatch(changeTableMinerModelRowsLastUpdate(date));
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
			});
	};
export const changeClientRows =
	(v = '') =>
	async (dispatch, getState) => {
		const state = getState();
		let clients =
			state.tableAdminClient.rows !== undefined &&
			typeof state.tableAdminClient.rows === 'string'
				? JSON.parse(state.tableAdminClient.rows)
				: state.tableAdminClient.rows;
		dispatch(changeTableClientRowsLoading(true));
		let graphqlQuery = {
			operationName: 'UpsertClient',
			query: gql.UpsertClient,
			variables: v,
		};

		const token = jwt.sign(graphqlQuery);
		await axios({
			baseURL: URL,
			url: '/api',
			method: 'post',
			headers: headers,
			data: { token: token },
		})
			.then((response) => {
				let client = response.data.data.UpsertClient;
				let date = Date.now();
				let payload;
				if (Object.prototype.hasOwnProperty.call(v, 'id')) {
					void Object.keys(clients).map((i) => {
						if (clients[i].id === v.id) {
							clients[i].username = v.username;
							clients[i].surname = v.surname;
							clients[i].name = v.name;
							clients[i].patronymic = v.patronymic;
							clients[i].phone = v.phone;
							clients[i].binanceApiKey = v.binanceApiKey;
							clients[i].binanceApiSecret = v.binanceApiSecret;
							clients[i].binanceSubName = v.binanceSubName;
						}
						return '';
					});
					payload = clients;
				} else {
					payload = [...clients, client];
				}
				setTimeout(() => {
					dispatch(changeTableClientRows(payload));
					dispatch(changeTableClientRowsLoading(false));
					dispatch(changeTableClientRowsLastUpdate(date));
				}, 2000);
			})
			.catch((err) => {
				console.log(err);
			});
	};
