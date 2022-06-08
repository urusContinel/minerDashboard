import express from 'express';
import Route from './app/routes/route.js';
const app = express();

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

Route(app);

const port = 666;
const server = app.listen(port, () => {
	console.log('Listening at http://localhost:' + port + '/api');
});
server.on('error', console.error);
