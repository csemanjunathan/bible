'use strict';

import adminUserModel from '../../src/models/admin-user.model';
import config from '../config/environment';
const bcrypt = require('bcrypt');

export default async () => {
	//if (!config.seedDB) {
	//	return Promise.resolve();
	//}
	const promises = [];
	const adminUsersCount = await adminUserModel.countDocuments();
	const salt = await bcrypt.genSalt(10);
	console.log(adminUsersCount);
	const adminUsers = [
		{
			name: 'Admin',
			email: 'tamilagathiyan.t@gmail.com',
			password: await bcrypt.hash('welcome@123', salt),
			creator_id: 1,
			updator_id: 1,
			created_at: new Date(),
			updated_at: new Date()
		},
		{
			name: 'Admin',
			email: 'admin@gmail.com',
			password: await bcrypt.hash('welcome@123', salt),
			creator_id: 1,
			updator_id: 1,
			created_at: new Date(),
			updated_at: new Date()
		}
	];

	if (!adminUsersCount) {
		const adminUserPromise = await adminUserModel
			.find({})
			.deleteMany()
			.then(() => {
				adminUserModel
					.create(adminUsers)
					.then(() => console.log('finished populating access periods'))
					.catch((err) => console.log('error populating access periods', err));
			});
		promises.push(adminUserPromise);
	}
	return Promise.all(promises);
};
 