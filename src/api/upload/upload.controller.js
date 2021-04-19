/* eslint-disable no-prototype-builtins */
/**
 * Using standard endpoints.
 *
 */

'use strict';
import { resourceModel } from '../../config/resource';
const multer = require('multer');
import StreamZip from 'node-stream-zip';
import { sendRsp } from '../../utils/response';

export const index = async (req, res) => {
	return sendRsp(res, 200, req.trans('OK'));
};

export const uploadFile = async (req, res) => {
	try {
		const { version, language } = req.body;
		const uploadedPath = req.file.path;

		const zip = new StreamZip({
			file: uploadedPath,
			storeEntries: true
		});

		zip.on('ready', () => {
			// Take a look at the files
			console.log(`Entries read: ${zip.entriesCount}`);
			var zipDotTxtContents = '';
			for (const entry of Object.values(zip.entries())) {
				const desc = entry.isDirectory ? 'directory' : `${entry.size} bytes`;
				console.log(desc);
				if (!entry.isDirectory) {
					zipDotTxtContents = zip.entryDataSync(entry.name).toString('utf8');
					let parsed_json = JSON.parse(zipDotTxtContents);

					parsed_json.forEach((item) => {
						item.version = version;
						item.language = language;
						console.log(item);
						console.log('***************************************');
						resourceModel.book.create({
							item
						});
					});
				}
			}
			zip.close();
		});
		return sendRsp(res, 200, req.trans('OK'));
	} catch (error) {
		return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
	}
};

export const upload = multer({
	dest: '../uploads/zip/',
	fileFilter (req, file, cb) {
		if (!file.originalname.endsWith('.zip')) {
			return cb(new Error('Please upload zip file'));
		}
		cb(true);
	}
});
