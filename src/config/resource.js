'use strict';

import bookModel from '../models/book.model';
import adminUserModel from '../models/admin-user.model';

//MODELS CONFIGURATION
export const resourceModel = {
	book: bookModel,
	adminUser: adminUserModel
};

//NAMING CONVENTIONS
export const resources = {
	book: 'book'
};

//CONFIGURATION ALL POPULATE COLLECTIONS
export const references = {};
