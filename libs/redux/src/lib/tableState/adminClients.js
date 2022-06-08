import * as types from '../types';
import * as LocalStorage from '../localStorage';
import * as Col from './columns-data';

export function tableAdminClientReducer(
	state = {
		sortModel: LocalStorage.isset('ClientSortModel') || [
			{ field: 'id', sort: 'asc' },
		],
		pinnedColumns: LocalStorage.isset('ClientPinnedColumns') || {
			left: ['id'],
			right: ['actions'],
		},
		rows: LocalStorage.isset('Client') || [],
		rowsLoading: LocalStorage.isset('ClientLoading') || false,
		rowsLastUpdate: LocalStorage.isset('ClientLastUpdate') || 0,
		columns: LocalStorage.isset('ClientColumns') || Col.client,
	},
	action
) {
	switch (action.type) {
		case types.TABLE_CLIENT_SORT_MODEL_CHANGED: {
			LocalStorage.Change(
				'ClientSortModel',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				sortModel: JSON.parse(LocalStorage.isset('ClientSortModel')),
			};
		}
		case types.TABLE_CLIENT_PINNED_COLUMNS_CHANGED: {
			LocalStorage.Change(
				'ClientPinnedColumns',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				pinnedColumns: JSON.parse(
					LocalStorage.isset('ClientPinnedColumns')
				),
			};
		}
		case types.TABLE_CLIENT_ROWS_CHANGED: {
			LocalStorage.Change('Client', JSON.stringify(action.payload));
			return {
				...state,
				rows: JSON.parse(LocalStorage.isset('Client')),
			};
		}
		case types.TABLE_CLIENT_ROWS_LOADING_CHANGED: {
			/* console.log(JSON.stringify(action.payload)); */
			LocalStorage.Change(
				'ClientLoading',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				rowsLoading: LocalStorage.isset('ClientLoading'),
			};
		}
		case types.TABLE_CLIENT_ROWS_LAST_UPDATE_CHANGED: {
			LocalStorage.Change(
				'ClientLastUpdate',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				rowsLastUpdate: Number(LocalStorage.isset('ClientLastUpdate')),
			};
		}
		case types.TABLE_CLIENT_COLUMNS_CHANGED: {
			LocalStorage.Change(
				'ClientColumns',
				JSON.stringify(action.payload)
			);
			return {
				...state,
				columns: JSON.parse(LocalStorage.isset('ClientColumns')),
			};
		}

		default: {
			return state;
		}
	}
}
