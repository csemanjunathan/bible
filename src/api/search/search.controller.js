/* eslint-disable no-prototype-builtins */
/**
 * Using standard endpoints.
 *
 */

'use strict';
import { resourceModel } from '../../config/resource';
import { sendRsp, responseHandler } from '../../utils/response';
const multer = require('multer');

export const search = async (req, res) => {
	try {
		const { search_word } = req.body;
		const page = parseInt(req.query.page, 10) || 1;
		const limit = parseInt(req.query.limit, 10) || 10;
		const skip = (limit * page) - limit;
		const sort = {
			_id: req.query.sort ? req.query.sort : 1
		};
		req.options = {
			limit,
			skip,
			sort
		};
		const queryObj = { text: { $regex: search_word, $options: 'i' } };
		const booksCount = await countRows('book', queryObj);
		const books = await resourceModel.book.find(queryObj, '-__v', req.options).lean();

		const pages = Math.ceil(booksCount / req.options.limit);
		const response = responseHandler(books, booksCount, page, pages);
		return sendRsp(res, 200, req.trans('OK'), {
			...response
		});
	} catch (error) {
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
