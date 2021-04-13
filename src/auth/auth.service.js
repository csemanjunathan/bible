'use strict';

import util from 'util';
import compose from 'composable-middleware';
import redisConnection from '../db/redis';
import { sendRsp } from '../utils/response';

export const isAuth = () => {
	return compose().use(async (req, res, next) => {
		try {
			if (req.query.authorization) {
				req.headers.authorization = req.query.authorization;
			}
			if (!req.headers.authorization) {
				return sendRsp(res, 501, 'Bad Gateway');
			}
			const accessToken = await headerCheck(req.headers.authorization);
			redisConnection.SELECT(1);
			const GET = util.promisify(redisConnection.GET).bind(redisConnection);

			const isCheck = await GET(accessToken);
			if (!isCheck) {
				return sendRsp(res, 401, 'Token Expired');
			}
			next();
		} catch (error) {
			console.log('Error:::', error);
			return sendRsp(res, 500, 'Server error');
		}
		return false;
	});
};

const headerCheck = async (header) => {
	try {
		const headerToken = header.split(' ');
		return headerToken[1];
	} catch (error) {
		return Promise.reject(error);
	}
};
