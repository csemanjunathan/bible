'use strict';

require('dotenv').config();

import _ from 'lodash';

const all = {
	node_env: process.env.NODE_ENV,
	ip: process.env.IP || '0.0.0.0',
	port: process.env.PORT,
	tmp: process.env.TMP || '/tmp',
	secrets: {
		accessToken: process.env.ACCESS_TOKEN_SECRET || 'my_access_token',
		refreshToken: process.env.REFRESH_TOKEN_SECRET || 'my_refresh_token'
	},
	pageNumber: process.env.PAGE_NUMBER || 1,
	pageLimit: process.env.PAGE_LIMIT || 10,
	s3FileUpload: {
		expiresInMinutes: 60 * 15,
		keyId: process.env.S3_KEY_ID,
		secret: process.env.S3_SECRET,
		bucket: process.env.S3_BUCKET,
		region: process.env.S3_REGION
	},
	token: {
		expiresInMinutes: 300
	},
	seedDB: false,
	// MongoDB connection options
	mongo: {
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true
		}
	},
	// Redis Connection
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD
	},
	jwt: {
		secret: process.env.JWT_SECRET || 'hZcWLt7vUmyeSuHsFPFVpHJlqpQokI1JzzjfitdcOdnUTu3L7Jn8OeIdvW7M0j0B'
	}
};

//MERGED THE FILES EASILY TO HANDLE USING WITH CONFIG
const mergeObj = _.merge(all, require(`./${process.env.NODE_ENV}`));

export default mergeObj;
