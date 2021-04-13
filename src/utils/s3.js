'use strict';

const configFIle = require('../config/environment');
const { URL } = require('url');
const AWS = require('aws-sdk');
const config = configFIle.default;

const s3 = new AWS.S3({
	accessKeyId: config.s3FileUpload.keyId,
	secretAccessKey: config.s3FileUpload.secret,
	region: config.s3FileUpload.region
});

module.exports = (params, cb) => {
	s3.upload(params, (err, data) => {
		if (err) {
			console.log('err', err);
			cb(err, null);
		}

		cb(null, data.Location);
	});
};

const s3delete = (params, cb) => {
	s3.deleteObjects(params, (err, data) => {
		if (err) {
			cb(err, null);
		}
		console.log('Successfully removed from s3', data);
		cb(null, data);
	});
};

const generateKey = (imageUrl) => {
	const myURL = new URL(imageUrl);
	return myURL.pathname.substr(1);
};

const generateSignedURL = (imageUrl) => {
	if (imageUrl) {
		const params = {
			Bucket: config.s3FileUpload.bucket,
			Key: generateKey(imageUrl),
			Expires: 50 * 60
		};
		return s3.getSignedUrl('getObject', params);
	}
	return false;
};

module.exports.s3delete = s3delete;
module.exports.generateSignedURL = generateSignedURL;
