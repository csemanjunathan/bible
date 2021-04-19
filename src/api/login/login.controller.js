/* eslint-disable no-prototype-builtins */
/**
 * Using standard endpoints.
 *
 */

'use strict';
import { resourceModel } from '../../config/resource';
import config from '../../config/environment';
import { sendRsp } from '../../utils/response';
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const adminUser = await resourceModel.adminUser.findOne({ email });
		console.log(adminUser);
		if (adminUser) {
			// check user password with hashed password stored in the database
			const validPassword = await bcrypt.compare(password, adminUser.password);
			let result = {};
			if (validPassword) {
				const payload = { name: adminUser.name, email: adminUser.email };
				const options = { expiresIn: '2d' };
				const { secret } = config.jwt;
				const token = jwt.sign(payload, secret, options);

				// console.log('TOKEN', token);
				result = adminUser;
				let access_token = token;
				const data = { result, access_token };
				return sendRsp(res, 200, req.trans('OK'), {
					data
				});
			} 
				return sendRsp(res, 400, 'Invalid Password');
			
		}
	} catch (error) {
		console.log(error);
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const upload = multer({
	fileFilter (req, file, cb) {
		if (!file.originalname.endsWith('.zip')) {
			return cb(new Error('Please upload zip file'));
		}
		cb(true);
	}
});

export const countRows = (modelName, queryObj) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName]
			.countDocuments(queryObj)
			.then((count) => {
				resolve(count);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
