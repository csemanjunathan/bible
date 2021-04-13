'use strict';

import { elasticClient } from '../config/elasticsearch';

export const ping = async () => {
	try {
		return await elasticClient.ping({
			requestTimeout: 30000
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// 1. Create index
export const initIndex = async (index) => {
	try {
		return await elasticClient.indices.create({
			index
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// 2. Check if index exists
export const indexExists = async (index) => {
	try {
		return await elasticClient.indices.exists({
			index
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// 3. Update the settings
export const updateSettings = async (index, body) => {
	try {
		return await elasticClient.indices.putSettings({
			index,
			body
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// 4.  Preparing index and its mapping
export const initMapping = async (index, type, body) => {
	try {
		return await elasticClient.indices.putMapping({
			index,
			type,
			body,
			include_type_name: true
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// 5. Add a document
export const addDocument = async (index, id, type, body) => {
	try {
		return await elasticClient.index({
			index,
			id,
			type,
			body
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// 6. Update a document
export const updateDocument = async (index, id, type, payload) => {
	try {
		return await elasticClient.update({
			index,
			id,
			type,
			body: {
				doc: {
					payload
				}
			},
			refresh: true
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const openIndices = async (index) => {
	try {
		return await elasticClient.indices.open({
			index
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

export const closeIndices = async (index) => {
	try {
		return await elasticClient.indices.close({
			index
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

/*
 *	[xxxxxxxxxxxxxxxxx=-----  DANGER AREA [RESTRICTED USE] -----=xxxxxxxxxxxxxxxxxxxxx]
 */

// Delete a document from an index
export const deleteDocument = async (index, id, type) => {
	try {
		return elasticClient.delete({
			index,
			type,
			id
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// Delete all
export const deleteAll = async () => {
	try {
		return elasticClient.indices.delete({
			index: '_all'
		});
	} catch (error) {
		return Promise.reject(error);
	}
};

// [xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx]

export const search = async (index, type, body) => {
	try {
		console.log(body);
		return await elasticClient.search({
			index,
			type,
			body
		});
	} catch (error) {
		return Promise.reject(error);
	}
};
