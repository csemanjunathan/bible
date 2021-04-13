import mongoose from 'mongoose';
import config from '../../config/environment';
import { log } from '../../libs/logger';

export const mongoDBConnection = () => {
	mongoose.connect(config.mongo.uri, config.mongo.options).then(() => {
		log.info('MongoDB Connected!!!');
		console.log('MongoDB Connected!!!');
		return Promise.resolve({});
	});
	mongoose.connection.on('error', (err) => {
		log.error(err);
		console.log('Error:::', err);
		process.exit(-1);
	});
};
