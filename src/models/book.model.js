'use strict';

import mongoose from 'mongoose';
const { Schema } = mongoose;

const book = new Schema(
	{
		book:{
			type: String,
			trim: true,
			index: true
		},
		chapter:{
			type: Number,
			trim: true,
			index: true
		},
		verse:{
			type: Number,
			trim:true,
			index: true
		},
		text:{
			type: String,
			trim:true,
			index: true
		},
		version:{
			type: String,
			trim:true,
			index: true
		},
		language:{
			type: String,
			trim:true,
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

export default mongoose.model('book', book);
