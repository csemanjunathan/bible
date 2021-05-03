'use strict';
require('dotenv').config();

// Test specific configuration
// ==================================
module.exports = {
	mongo: {
		uri: process.env.MONGODB_URI
	}
};
