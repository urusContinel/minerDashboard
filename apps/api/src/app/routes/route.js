import { graphqlHTTP } from 'express-graphql';
import { schema } from '../graphql/models/AsicsHashrate.js';
import { ListQuery } from '../database/Query.js';
import CreateAll from '../database/create-all.js';
import UserBinance from '../binance/connect.js';
import * as jwt from '@exldev/jwt';
import bodyParser from 'body-parser';
import { graphql } from 'graphql';

/* function Tokens(req, res, next) {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (token == null) return res.sendStatus(401);
	if (jwt.verify(token)) {
		const tokenDecode = jwt.decode(token);
		req.payload = tokenDecode.payload;
		next();
	} else {
		return res.sendStatus(401);
	}
} */

var Route = (app) => {
/* 	app.use((req, res, next) => {
		console.dir(req.originalUrl); // '/admin/new?sort=desc'
		console.dir(req.baseUrl); // '/admin'
		console.dir(req.path); // '/new'
		res.write('<html>');
		res.write('<body>');
		res.write(
			'<h1><pre><code>' +
				req.originalUrl +
				' ||| ' +
				req.path +
				'<code/></pre></h1>'
		);
		res.write('</body>');
		res.write('</html>');
		res.end();
	}); */

 	app.use(
		'/v1/graphql',
		graphqlHTTP({
			schema: schema,
			rootValue: ListQuery,
			graphiql: true,
		})
	);

	app.post('/v1/api', bodyParser.json(), (req, res) => {
		const token = req.body.token;
		if (token == null) return res.sendStatus(401);
		const DecodeToken = jwt.decode(token);
		const { payload } = DecodeToken;
		graphql({
			schema: schema,
			source: String(payload.query),
			variableValues: payload.variables,
			operationName: payload.operationName,
			rootValue: ListQuery,
		}).then((response) => {
			res.send(response);
		});
	});

	app.use('/create-all', CreateAll); 
	/* app.use('/binance', UserBinance); */
};
export default Route;
