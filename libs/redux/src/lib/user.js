import * as LocalStorage from './localStorage';
import * as types from './types';

export function userReducer(state = LocalStorage.isset('user') || {}, action) {
	switch (action.type) {
		case types.LOG_OUT: {
			void LocalStorage.Remove('user');
			return LocalStorage.isset('user');
		}
		case types.LOG_IN: {
			void LocalStorage.Change('user', JSON.stringify(action.payload));
			return LocalStorage.isset('user');
		}
		default: {
			if (state !== undefined && typeof state === 'string') {
				return JSON.parse(state);
			}
			return state;
		}
	}
}
