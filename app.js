'use strict';

import path from 'path';
import express from 'express';
import http from 'http';
import expressConfig from './src/config/express';
import routerConfig from './routes';
import config from './src/config/environment';
import { mongoDBConnection } from './src/db/mongodb';
import hbs from 'hbs';
import { log } from './src/libs/logger';

const app = express(),
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, 'index.html');
const server = http.createServer(app);

app.set('view engine','hbs');
app.use(express.static(path.join(__dirname,'./src/public')));
app.set('views', path.join(__dirname, './src/views'));
app.get('/', (req, res) => {
	res.sendFile(HTML_FILE);
});

mongoDBConnection();
expressConfig(app);
routerConfig(app);

const startServer = () => {
	server.listen(config.port, config.ip, () => {
		log.info('Express server start');
		console.log('Express server listening on ', server.address().port);
	});
};

setImmediate(startServer);

export default app;
