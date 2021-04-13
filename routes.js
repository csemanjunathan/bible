'use strict';

import elasticSearch from './src/api/router/elasticsearch/router';
import search from './src/api/search/index';
import { serve, setup } from 'swagger-ui-express';
import { swaggerUI } from './src/config/swagger';
import upload from './src/api/upload/index';

export default (app) => {
	app.get('/api/v1/gudsho', function (req, res) {
		res.send('Welcome to search service in gudsho');
	});
	app.use('/api/v1/elastic', elasticSearch);
	app.use('/search', search);
	app.use('/upload', upload);

	app.use('/api/v1/api-docs', serve, setup(swaggerUI));
};
