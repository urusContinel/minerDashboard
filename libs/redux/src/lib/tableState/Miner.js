import * as types from '../types';
import * as LocalStorage from '../localStorage';
import * as Col from './columns-data';

export function tableMinerReducer(
	state = {
		sortModel: LocalStorage.isset('MinerSortModel') || [
			{ field: 'id', sort: 'asc' },
		],
		pinnedColumns: LocalStorage.isset('MinerPinnedColumns') || {
			left: ['id'],
			right: ['actions'],
		},
		rows: LocalStorage.isset('Miner') || [],
		rowsLoading: LocalStorage.isset('MinerLoading') || false,
		rowsLastUpdate: LocalStorage.isset('MinerLastUpdate') || 0,
		columns: LocalStorage.isset('MinerColumns') || Col.Miner,
	},
	action
) {
	switch (action.type) {
		case types.TABLE_MINER_SORT_MODEL_CHANGED: {
			LocalStorage.Change(
				'MinerSortModel',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				sortModel: JSON.parse(LocalStorage.isset('MinerSortModel')),
			};
		}
		case types.TABLE_MINER_PINNED_COLUMNS_CHANGED: {
			LocalStorage.Change(
				'MinerPinnedColumns',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				pinnedColumns: JSON.parse(
					LocalStorage.isset('MinerPinnedColumns')
				),
			};
		}
		case types.TABLE_MINER_ROWS_CHANGED: {
			LocalStorage.Change('Miner', JSON.stringify(action.payload));
			return {
				...state,
				rows: JSON.parse(LocalStorage.isset('Miner')),
			};
		}
		case types.TABLE_MINER_ROWS_LOADING_CHANGED: {
			/* console.log(JSON.stringify(action.payload)); */
			LocalStorage.Change('MinerLoading', JSON.stringify(action.payload));
			return {
				...state,
				rowsLoading: LocalStorage.isset('MinerLoading'),
			};
		}
		case types.TABLE_MINER_ROWS_LAST_UPDATE_CHANGED: {
			LocalStorage.Change(
				'MinerLastUpdate',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				rowsLastUpdate: Number(LocalStorage.isset('MinerLastUpdate')),
			};
		}
		case types.TABLE_MINER_COLUMNS_CHANGED: {
			/* console.log(action.payload); */
			LocalStorage.Change('MinerColumns', JSON.stringify(action.payload));
			return {
				...state,
				columns: JSON.parse(LocalStorage.isset('MinerColumns')),
			};
		}

		default: {
			return state;
		}
	}
}
