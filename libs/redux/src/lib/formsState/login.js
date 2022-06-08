import * as types from '../types';
import { LoginDataAlert } from './login-alert-data';

export function formLoginReducer(
	state = {
		username: '',
		password: '',
		loading: false,
		disabledButton: true,
		alert: LoginDataAlert({types:'info'}),
		colorTextFields: 'primary',
		disabledTextFields: false,
	},
	action
) {
	switch (action.type) {
		case types.FORM_LOGIN_USERNAME_CHANGED: {
			return { ...state, username: action.payload };
		}
		case types.FORM_LOGIN_PASSWORD_CHANGED: {
			return { ...state, password: action.payload };
		}
		case types.FORM_LOGIN_LOADING_CHANGED: {
			return { ...state, loading: action.payload };
		}
		case types.FORM_LOGIN_DISABLED_BUTTON_CHANGED: {
			return { ...state, disabledButton: action.payload };
		}
		case types.FORM_LOGIN_ALERT_CHANGED: {
			let a = action.payload;
			let b = LoginDataAlert({types:a.types, name:a.name,  message:a.message});
			return { ...state, alert: b };
		}
		case types.FORM_LOGIN_COLOR_TEXTFIELDS_CHANGED: {
			return { ...state, colorTextFields: action.payload };
		}
		case types.FORM_LOGIN_DISABLED_TEXTFIELDS_CHANGED: {
			return { ...state, disabledTextFields: action.payload };
		}

		default: {
			/* console.log(state.darkmode); */
			return state;
		}
	}
}


