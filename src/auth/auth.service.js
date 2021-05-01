'use strict';

import compose from 'composable-middleware';
import { sendRsp } from '../utils/response';
import config from '../config/environment';
import { verify } from 'jsonwebtoken';

export const isAuth = () => {
	return compose().use(async (req, res, next) => {
		try {
			if (req.query.authorization) {
				req.headers.authorization = req.query.authorization;
			}
			if (!req.headers.authorization) {
				return sendRsp(res, 501, req.trans('bad_gateway'));
			}
			const accessToken = await headerCheck(req.headers.authorization);
			req.authUser = await jwtVerify(accessToken);
			return next();
		} catch (error) {
			if (error.statusCode) {
				return sendRsp(res, error.statusCode, req.trans('jwt_token_expired'));
			}
			return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
		}
	});
};

export const headerCheck = async (header) => {
	try {
		return header.split(' ')[1];
	} catch (error) {
		return Promise.reject(error);
	}
};

export const jwtVerify = async (token) => {
	return verify(token, config.jwt.secret, (err, verifiedJwt) => {
		if (err) return Promise.reject({ statusCode: 401 });
		return verifiedJwt;
	});
};
