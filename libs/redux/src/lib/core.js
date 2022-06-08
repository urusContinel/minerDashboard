import * as LocalStorage from './localStorage';
import * as types from './types';

export function coreReducer(
	state = LocalStorage.isset('darkmode') || 'light',
	action
) {
	switch (action.type) {
		case types.DARK_MODE_CHANGED: {
			LocalStorage.Change(
				'darkmode',
				state === 'light' ? 'dark' : 'light'
			);
			return state === 'light' ? 'dark' : 'light';
		}
		case types.DARK_MODE_LOAD: {
			return state;
		}
		default: {
			return state;
		}
	}
}
