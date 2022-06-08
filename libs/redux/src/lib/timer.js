import * as LocalStorage from './localStorage';
import * as types from './types';

export function timerReducer(
	state = LocalStorage.isset('tick') || Date.now(),
	action
) {
	switch (action.type) {
		case types.TICK: {
            let t= Date.now()
			LocalStorage.Change(
				'tick',
				t
			);
			return t;
		}
		default: {
			return state;
		}
	}
}