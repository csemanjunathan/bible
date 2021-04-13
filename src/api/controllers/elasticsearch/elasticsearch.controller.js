/**
 * Using standard endpoints.
 *
 * GET     	mediadetails/api/v1/elastic/pingEs                 ->  pinigEs
 * POST    	mediadetails/api/v1/elastic/init                   ->  initIndex
 * POST     mediadetails/api/v1/elastic/check                  ->  checkIndex
 * POST     mediadetails/api/v1/elastic/setting                ->  settingUpdate
 * POST  	mediadetails/api/v1/elastic/mapping                ->  mapping
 * POST  	mediadetails/api/v1/elastic/add                    ->  addDocument
 */

'use strict';
import { sendRsp, responseHandler } from '../../../utils/response';
import {
	ping,
	initIndex,
	indexExists,
	updateSettings,
	initMapping,
	addDocument,
	updateDocument,
	search,
	openIndices,
	closeIndices
} from '../../../services/elasticsearch.service';
import config from '../../../config/environment';
import { docType, settings, initmapping, searchpayload } from '../../../utils/elastic.settings';

export const pingES = async (req, res) => {
	try {
		const pingRes = await ping();
		if (pingRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('cluster_up'));
	} catch (error) {
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const init = async (req, res) => {
	try {
		const initIndexRes = await initIndex(config.elasticSearch.elasticIndex);
		if (initIndexRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('index_created'));
	} catch (error) {
		if (error.statusCode === 400) {
			return sendRsp(res, error.status, req.trans('index_exists'));
		}
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const check = async (req, res) => {
	try {
		const checkRes = await indexExists(config.elasticSearch.elasticIndex);
		if (checkRes.statusCode === 404) {
			return sendRsp(res, 404, req.trans('indexNotFound'));
		}
		if (checkRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('index_exists'));
	} catch (error) {
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const open = async (req, res) => {
	try {
		const openIndexRes = await openIndices(config.elasticSearch.elasticIndex);
		if (openIndexRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('index_opened'));
	} catch (error) {
		if (error.statusCode === 400) {
			return sendRsp(res, error.status, req.trans('forbidden'));
		}
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const close = async (req, res) => {
	try {
		const initIndexRes = await closeIndices(config.elasticSearch.elasticIndex);
		if (initIndexRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('index_closed'));
	} catch (error) {
		if (error.statusCode === 400) {
			return sendRsp(res, error.status, req.trans('forbidden'));
		}
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const setting = async (req, res) => {
	try {
		const settingRes = await updateSettings(config.elasticSearch.elasticIndex, settings);
		if (settingRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('settings_updated'));
	} catch (error) {
		if (error.statusCode === 400) {
			return sendRsp(res, error.statusCode, req.trans('cluster_block_exception'));
		}
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const mapping = async (req, res) => {
	try {
		const mappingRes = await initMapping(config.elasticSearch.elasticIndex, docType, initmapping);
		if (mappingRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('mapping_added_successfully'));
	} catch (error) {
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const add = async (req, res) => {
	try {
		req.checkBody('id', req.trans('id_missing')).notEmpty();
		req.checkBody('title', req.trans('title_required')).notEmpty();
		const errors = req.validationErrors();
		if (errors) {
			return sendRsp(res, 400, errors);
		}
		const addRes = await addDocument(config.elasticSearch.elasticIndex, req.body.id, docType, req.body);
		if (addRes.statusCode !== 201 && addRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, addRes.statusCode, req.trans('documentation_created'));
	} catch (error) {
		if (error.statusCode === 400) {
			return sendRsp(res, error.statusCode, req.trans('index_closed_open'), {}, error);
		}
		return sendRsp(res, 500, req.trans('fetch_failed'));
	}
};

export const update = async (req, res) => {
	try {
		const updateDocumentRes = await updateDocument(
			config.elasticSearch.elasticIndex,
			req.params.id,
			docType,
			req.body
		);
		if (updateDocumentRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		return sendRsp(res, 200, req.trans('document_updated'));
	} catch (error) {
		if (error.statusCode === 400) {
			return sendRsp(res, error.statusCode, req.trans('index_closed_open'), {}, error);
		}
		return sendRsp(res, 500, req.trans('fetch_failed'));
	}
};

export const searchES = async (req, res) => {
	try {
		req.checkQuery('q', req.trans('id_required')).notEmpty();
		const errors = req.validationErrors();
		if (errors) {
			return sendRsp(res, 400, errors);
		}
		const page = parseInt(req.query.page, 10) || config.pageNumber;
		const limit = parseInt(req.query.limit, 10) || config.pageLimit;
		const skip = (limit * page) - limit;
		const searchValue = req.query.q;
		searchpayload.query.bool.must.multi_match.query = `${searchValue}*`;
		searchpayload.from = skip;
		console.log(searchpayload);

		const searchESRes = await search(
			config.elasticSearch.elasticIndex,
			docType,
			searchpayload
		);

		if (searchESRes.statusCode !== 200) {
			return sendRsp(res, 403, req.trans('forbidden'));
		}
		if (searchESRes.statusCode === 200) {
			const searchResults = searchESRes.body.hits.hits.map((i) => i._source);
			const { searchResultsCount } = searchESRes.body.hits;
			const pages = Math.ceil(searchResultsCount / limit);
			const response = responseHandler(searchResults, searchResultsCount, page, pages);
			return sendRsp(res, 200, req.trans('data_fetched'), {
				...response
			});
		}
	} catch (error) {
		console.log(error);
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
	return false;
};
