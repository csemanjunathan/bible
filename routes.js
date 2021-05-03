'use strict';


import search from './src/api/search/index';
import { serve, setup } from 'swagger-ui-express';
import { swaggerUI } from './src/config/swagger';
import upload from './src/api/upload/index';
import auth from './src/api/login/index';

export default (app) => {
	app.get('/api/v1/bible', function (req, res) {
		res.send('Welcome to bible service');
	});
	
	app.use('/api/v1/search', search);
	app.use('/api/v1/upload', upload);
	app.use('/api/v1/auth', auth);

	app.use('/api/v1/api-docs', serve, setup(swaggerUI));
};
