export const isBrowser = typeof window !== `undefined`;
export const isset = (find) => {
	return isBrowser && window.localStorage
		? window.localStorage.getItem(find)
		: undefined;
};
export const Change = (find, value) => {
	return isBrowser && window.localStorage
		? window.localStorage.setItem(find, value)
		: undefined;
};
export const Remove= (find) => {
	return isBrowser && window.localStorage
		? window.localStorage.removeItem(find)
		: undefined;
};