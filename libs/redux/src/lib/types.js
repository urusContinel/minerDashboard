// REDUX CORE ACTION TYPES
export const DARK_MODE_CHANGED = 'core/DarkModeChange';
export const DARK_MODE_LOAD = 'core/DarkModeLoad';

//REDUX TIMER ACTION TYPES
export const TICK = 'timer/tick';

// REDUX USER ACTION TYPES
export const LOG_OUT = 'user/log_out';
export const LOG_IN = 'user/log_in';

//REDUX formLoginReducer ACTION TYPES

export const FORM_LOGIN_USERNAME_CHANGED = 'login/username_changed';
export const FORM_LOGIN_PASSWORD_CHANGED = 'login/password_changed';
export const FORM_LOGIN_LOADING_CHANGED = 'login/loading_changed';
export const FORM_LOGIN_DISABLED_BUTTON_CHANGED =
	'login/disabledButton_changed';
export const FORM_LOGIN_ALERT_CHANGED = 'login/alert_changed';
export const FORM_LOGIN_COLOR_TEXTFIELDS_CHANGED =
	'login/colorTextfields_changed';
export const FORM_LOGIN_DISABLED_TEXTFIELDS_CHANGED =
	'login/disabledTextfields_changed';

// REDUX tableAdminClientReducer ACTION TYPES

export const TABLE_CLIENT_SORT_MODEL_CHANGED =
	'tableAdminClient/sortModel_changed';
export const TABLE_CLIENT_PINNED_COLUMNS_CHANGED =
	'tableAdminClient/pinnedColumns_changed';
export const TABLE_CLIENT_ROWS_CHANGED = 'tableAdminClient/rows_changed';
export const TABLE_CLIENT_ROWS_LOADING_CHANGED =
	'tableAdminClient/rowsLoading_changed';
export const TABLE_CLIENT_ROWS_LAST_UPDATE_CHANGED =
	'tableAdminClient/rowsLastUpdate_changed';
export const TABLE_CLIENT_COLUMNS_CHANGED = 'tableAdminClient/columns_changed';

// REDUX tableMinerReducer ACTION TYPES

export const TABLE_MINER_SORT_MODEL_CHANGED = 'tableMiner/sortModel_changed';
export const TABLE_MINER_PINNED_COLUMNS_CHANGED =
	'tableMiner/pinnedColumns_changed';
export const TABLE_MINER_ROWS_CHANGED = 'tableMiner/rows_changed';
export const TABLE_MINER_ROWS_LOADING_CHANGED =
	'tableMiner/rowsLoading_changed';
export const TABLE_MINER_ROWS_LAST_UPDATE_CHANGED =
	'tableMiner/rowsLastUpdate_changed';
export const TABLE_MINER_COLUMNS_CHANGED = 'tableMiner/columns_changed';

// REDUX tableMinerModelReducer ACTION TYPES

export const TABLE_MINER_MODEL_SORT_MODEL_CHANGED =
	'tableMinerModel/sortModel_changed';
export const TABLE_MINER_MODEL_PINNED_COLUMNS_CHANGED =
	'tableMinerModel/pinnedColumns_changed';
export const TABLE_MINER_MODEL_ROWS_CHANGED = 'tableMinerModel/rows_changed';
export const TABLE_MINER_MODEL_ROWS_LOADING_CHANGED =
	'tableMinerModel/rowsLoading_changed';
export const TABLE_MINER_MODEL_ROWS_LAST_UPDATE_CHANGED =
	'tableMinerModel/rowsLastUpdate_changed';
export const TABLE_MINER_MODEL_COLUMNS_CHANGED =
	'tableMinerModel/columns_changed';
