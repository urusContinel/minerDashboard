/* import { readFileSync } from 'fs'; */
import {
	sign as _sign,
	verify as _verify,
	decode as _decode,
} from 'jsonwebtoken';
import {privateKEY,	publicKEY} from './key.js';

export function sign(payload) {
	var signOptions = {
		expiresIn: '30d',
		algorithm: 'RS256'
	};
	return _sign(payload, privateKEY, signOptions);
}
 export function verify(token) {
	var verifyOptions = {
		expiresIn: '30d',
		algorithms: ['RS256']
	};
	try {
		return _verify(token, publicKEY, verifyOptions , function(err, decoded) {
			console.log(decoded) // bar
			console.log(err) // bar
		  } );
	} catch (err) {
		return false;
	}
} 
export function decode(token) {
	return _decode(token, { complete: true });
}
