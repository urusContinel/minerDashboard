import { coreReducer } from './core';
import { formLoginReducer } from './formsState/login';
import { userReducer } from './user';
import { tableAdminClientReducer } from './tableState/adminClients';
import { tableMinerReducer } from './tableState/Miner';
import { tableMinerModelReducer } from './tableState/MinerModel';
import { timerReducer } from './timer';
// COMBINED REDUCERS
const reducers = {
	core: coreReducer,
	login: formLoginReducer,
	user: userReducer,
	tableAdminClient: tableAdminClientReducer,
	tableMiner: tableMinerReducer,
	tableMinerModel: tableMinerModelReducer,
	timer: timerReducer,
};

export default reducers;
