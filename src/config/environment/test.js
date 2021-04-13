'use strict';
require('dotenv').config();

// Test specific configuration
// ==================================
module.exports = {
	mongo: {
		uri: process.env.MONGODB_URI
	},
	elasticSearch: {
		elasticIndex: process.env.ELASTIC_INDEX || 'gudsho-test',
		elasticHost: process.env.ELASTIC_HOST || 'http://localhost:9200',
		perPage: process.env.PER_PAGE || 12,
		apiURL: process.env.API_URL || 'http://localhost:9200/search/api/v1/'
	}
};
