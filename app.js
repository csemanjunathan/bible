'use strict';

import path from 'path';
import express from 'express';
import http from 'http';

import expressConfig from './src/config/express';
import routerConfig from './routes';
import config from './src/config/environment';
import { mongoDBConnection } from './src/db/mongodb';
import { log } from './src/libs/logger';
import cors from 'cors';
import seed from './src/config/seed';



const app = express(),
	DIST_DIR = __dirname,
	HTML_FILE = path.join(DIST_DIR, 'index.html');
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, './src/public')));
app.get('/', (req, res) => {
	res.sendFile(HTML_FILE);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cors());

mongoDBConnection();
expressConfig(app);
routerConfig(app);
seed();

const startServer = () => {
	server.listen(config.port, config.ip, () => {
		log.info('Express server start');
		console.log('Express server listening on ', server.address().port);
	});
};

setImmediate(startServer);

export default app;
