'use strict';

import fs from 'fs';
import path from 'path';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './environment';
import expressValidator from 'express-validator';
import i18n from 'i18n';
const multipart = require('connect-multiparty');
const cookieParser = require('cookie-parser');

//Express middleware configuration
export default (app) => {
	app.use(
		bodyParser.urlencoded({
			extended: false
		})
	);
	app.use(
		multipart({
			uploadDir: config.tmp
		})
	);
	i18n.configure({
		locales: ['en', 'hi'],
		directory: `${__dirname}/locales`,
		defaultLocale: 'en'
	});

	app.use(i18n.init);
	app.use(function (req, res, next) {
		let lang;
		if (req.headers['x-language-code']) {
			lang = req.headers['x-language-code'];
		} else {
			lang = 'en';
		}
		i18n.setLocale(lang);
		req.trans = i18n.__;
		next();
	});
	app.use(cookieParser());
	app.use(express.json());
	app.use(bodyParser.json());
	app.use(morgan('short'));
	app.use(expressValidator([]));

	const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), {
		flags: 'a'
	});
	app.use(
		morgan('combined', {
			stream: accessLogStream
		})
	);
};
