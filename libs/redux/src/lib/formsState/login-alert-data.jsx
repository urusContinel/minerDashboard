export const LoginDataAlert = (alertData) => {
	let alert;
	const { types, name = '', message = '' } = alertData;
	switch (types) {
		case 'info': {
			let type = () => `info`;
			let title = () => `Information`;
			let text = () => `To authorize you need to fill login and password`;
			alert = { type: type(), title: title(), text: text() };
			break;
		}
		case 'success': {
			let type = () => `success`;
			let title = (name) => `User ${name} authorized`;
			let text = () => `You will be redirected at now on your Dashboard `;
			alert = { type: type(), title: title(name), text: text() };
			break;
		}
		case 'error': {
			let type = () => `error`;
			let title = () => `Error!!!`;
			let text = (message) => `Error text: ${message}.`;
			alert = { type: type(), title: title(), text: text(message) };
			break;
		}
	}
	return alert;
};
