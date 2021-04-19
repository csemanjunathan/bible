'use strict';

import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminUser = new Schema(
	{
		name: {
			type: String,
			trim: true,
			index: true
		},
		email: {
			type: String,
			trim: true,
			index: true
		},
		password: {
			type: String,
			trim: true,
			index: true
		},
		creator_id: {
			type: Number,
			trim: true,
			index: true
		},
		updator_id: {
			type: Number,
			trim: true,
			index: true
		}
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at'
		}
	}
);

export default mongoose.model('adminUser', adminUser);
