'use strict';
require('dotenv').config();

// Production specific configuration
// ==================================
module.exports = {
	mongo: {
		uri: process.env.MONGODB_URI
	}
};
