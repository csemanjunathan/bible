//UNIQUE RESPONSE CONFIGURATION

import { log } from '../libs/logger';

export const sendRsp = (res, statusCode, message, response = {}, errMsg = {}) => {
	let errorType = false;
	let status = 'success';
	if (statusCode !== 200 && statusCode !== 201) {
		errorType = true;
		status = 'error';
	}
	if (statusCode === 500) {
		console.log('Error:::');
		log.error('error', errMsg);
	}
	res.status(statusCode).send({
		statusCode,
		message,
		status,
		response,
		error: errorType
	});
};

export const responseHandler = (data, count, page, pages) => {
	return {
		data,
		total: count,
		recordsPerPage: data.length,
		currentPage: page || 1,
		totalPages: pages,
		previous: page > 1 ? page - 1 : null,
		next: page <= pages - 1 ? page + 1 : null
	};
};
