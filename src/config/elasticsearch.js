'use strict';

import { Client } from '@elastic/elasticsearch';
import config from './environment';
import { log } from '../libs/logger';

export const elasticClient = new Client({
	node: config.elasticSearch.elasticHost,
	maxRetries: 5,
	requestTimeout: 60000,
	sniffOnStart: true
});

export const elasticPing = async () => {
	elasticClient.ping({}, (err) => {
		if (err) {
			log.error('Error:::', err);
			console.trace('Elastic Search is down!!!!!');
			return;
		}
		log.info('Elastic Search is up!!!!');
		console.log('Elastic Search is up!!!!');
	});
};
