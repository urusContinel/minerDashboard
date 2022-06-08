//selectors core
export const getDarkMode = (state) => state.core;
export const getTick=(state)=>state.timer;

//selectors user
export const getUser = (state) => state.user;

//selectors formLoginReducer

export const getUserName = (state) => state.login.username;
export const getPassword = (state) => state.login.password;
export const getLoading = (state) => state.login.loading;
export const getDisabledButton = (state) => state.login.disabledButton;
export const getAlert = (state) => state.login.alert;
export const getColorTextField = (state) => state.login.colorTextFields;
export const getDisabledTextField = (state) => state.login.disabledTextFields;

//selectors tableAdminClientReducer
export const getAdminClientSortModel = (state) => {
	if (
		state.tableAdminClient.sortModel !== undefined &&
		typeof state.tableAdminClient.sortModel === 'string'
	) {
		return JSON.parse(state.tableAdminClient.sortModel);
	}
	return state.tableAdminClient.sortModel;
};
export const getAdminClientPinnedColumns = (state) => {
	if (
		state.tableAdminClient.pinnedColumns !== undefined &&
		typeof state.tableAdminClient.pinnedColumns === 'string'
	) {
		return JSON.parse(state.tableAdminClient.pinnedColumns);
	}
	return state.tableAdminClient.pinnedColumns;
};
export const getAdminClientRows = (state) => {
	if (
		state.tableAdminClient.rows !== undefined &&
		typeof state.tableAdminClient.rows === 'string'
	) {
		return JSON.parse(state.tableAdminClient.rows);
	}
	return state.tableAdminClient.rows;
};
export const getAdminClientRowsLoading = (state) =>
	JSON.parse(state.tableAdminClient.rowsLoading);
export const getAdminClientRowsLastUpdate = (state) =>
	Number(state.tableAdminClient.rowsLastUpdate);
export const getAdminClientColumns = (state) => state.tableAdminClient.columns;




//selectors tableAdminMinerReducer
export const getMinerSortModel = (state) => {
	if (
		state.tableMiner.sortModel !== undefined &&
		typeof state.tableMiner.sortModel === 'string'
	) {
		return JSON.parse(state.tableMiner.sortModel);
	}
	return state.tableMiner.sortModel;
};
export const getMinerPinnedColumns = (state) => {
	if (
		state.tableMiner.pinnedColumns !== undefined &&
		typeof state.tableMiner.pinnedColumns === 'string'
	) {
		return JSON.parse(state.tableMiner.pinnedColumns);
	}
	return state.tableMiner.pinnedColumns;
};
export const getMinerRows = (state) => {
	if (
		state.tableMiner.rows !== undefined &&
		typeof state.tableMiner.rows === 'string'
	) {
		return JSON.parse(state.tableMiner.rows);
	}
	return state.tableMiner.rows;
};
export const getMinerRowsLoading = (state) =>
	JSON.parse(state.tableMiner.rowsLoading);
export const getMinerRowsLastUpdate = (state) =>
	Number(state.tableMiner.rowsLastUpdate);
export const getMinerColumns = (state) => state.tableMiner.columns;




//selectors tableAdminMinerModelReducer
export const getMinerModelSortModel = (state) => {
	if (
		state.tableMinerModel.sortModel !== undefined &&
		typeof state.tableMinerModel.sortModel === 'string'
	) {
		return JSON.parse(state.tableMinerModel.sortModel);
	}
	return state.tableMinerModel.sortModel;
};
export const getMinerModelPinnedColumns = (state) => {
	if (
		state.tableMinerModel.pinnedColumns !== undefined &&
		typeof state.tableMinerModel.pinnedColumns === 'string'
	) {
		return JSON.parse(state.tableMinerModel.pinnedColumns);
	}
	return state.tableMinerModel.pinnedColumns;
};
export const getMinerModelRows = (state) => {
	if (
		state.tableMinerModel.rows !== undefined &&
		typeof state.tableMinerModel.rows === 'string'
	) {
		return JSON.parse(state.tableMinerModel.rows);
	}
	return state.tableMinerModel.rows;
};
export const getMinerModelRowsLoading = (state) =>
	JSON.parse(state.tableMinerModel.rowsLoading);
export const getMinerModelRowsLastUpdate = (state) =>
	Number(state.tableMinerModel.rowsLastUpdate);
export const getMinerModelColumns = (state) => state.tableMinerModel.columns;
