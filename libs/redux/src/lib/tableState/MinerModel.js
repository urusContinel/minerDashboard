import * as types from '../types';
import * as LocalStorage from '../localStorage';
import * as Col from './columns-data';

export function tableMinerModelReducer(
	state = {
		sortModel: LocalStorage.isset('MinerModelSortModel') || [
			{ field: 'id', sort: 'asc' },
		],
		pinnedColumns: LocalStorage.isset('MinerModelPinnedColumns') || {
			left: ['id'],
			right: ['actions'],
		},
		rows: LocalStorage.isset('MinerModel') || [],
		rowsLoading: LocalStorage.isset('MinerModelLoading') || false,
		rowsLastUpdate: LocalStorage.isset('MinerModelLastUpdate') || 0,
		columns: LocalStorage.isset('MinerModelColumns') || Col.MinerModel,
	},
	action
) {
	switch (action.type) {
		case types.TABLE_MINER_MODEL_SORT_MODEL_CHANGED: {
			LocalStorage.Change(
				'MinerModelSortModel',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				sortModel: JSON.parse(
					LocalStorage.isset('MinerModelSortModel')
				),
			};
		}
		case types.TABLE_MINER_MODEL_PINNED_COLUMNS_CHANGED: {
			LocalStorage.Change(
				'MinerModelPinnedColumns',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				pinnedColumns: JSON.parse(
					LocalStorage.isset('MinerModelPinnedColumns')
				),
			};
		}
		case types.TABLE_MINER_MODEL_ROWS_CHANGED: {
			LocalStorage.Change('MinerModel', JSON.stringify(action.payload));
			return {
				...state,
				rows: JSON.parse(LocalStorage.isset('MinerModel')),
			};
		}
		case types.TABLE_MINER_MODEL_ROWS_LOADING_CHANGED: {
			/* console.log(JSON.stringify(action.payload)); */
			LocalStorage.Change(
				'MinerModelLoading',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				rowsLoading: LocalStorage.isset('MinerModelLoading'),
			};
		}
		case types.TABLE_MINER_MODEL_ROWS_LAST_UPDATE_CHANGED: {
			LocalStorage.Change(
				'MinerModelLastUpdate',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				rowsLastUpdate: Number(
					LocalStorage.isset('MinerModelLastUpdate')
				),
			};
		}
		case types.TABLE_MINER_MODEL_COLUMNS_CHANGED: {
		/* 	console.log(action.payload); */
			LocalStorage.Change(
				'MinerModelColumns',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				columns: JSON.parse(LocalStorage.isset('MinerModelColumns')),
			};
		}

		default: {
			return state;
		}
	}
}
