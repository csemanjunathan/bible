import redis from 'redis';
import config from '../../config/environment';
import { log } from '../../libs/logger';

const redisConnection = redis.createClient({
	host: config.redis.host,
	port: config.redis.port,
	password: config.redis.password
});

redisConnection.on('connect', function () {
	log.info('Redis client connected');
	console.log('Redis client connected');
});

redisConnection.on('error', function (err) {
	log.error(err);
	console.log(`Something went wrong ${JSON.stringify(err)}`);
});

export default redisConnection;
