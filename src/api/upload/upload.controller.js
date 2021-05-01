/* eslint-disable no-prototype-builtins */
/**
 * Using standard endpoints.
 *
 */

'use strict';
import { resourceModel } from '../../config/resource';
import StreamZip from 'node-stream-zip';
import { sendRsp } from '../../utils/response';

export const index = async (req, res) => {
	return sendRsp(res, 200, req.trans('OK'));
};

export const test = async (req,res) => { 
	console.log(req.body) 
}

export const uploadFile = async (req, res, next) => {  
//console.log(req.body); 
	try {
		const { version, language } = req.body;

		const uploadedPath = req.files.book_zip.path;

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
				
				if (!entry.isDirectory) {
					zipDotTxtContents = zip.entryDataSync(entry.name).toString('utf8');
					let parsed_json = JSON.parse(zipDotTxtContents);

					parsed_json.forEach((item) => {
						item.version = version;
						item.language = language;
						
						resourceModel['book'].create(item, function (err, docs) {
							if (err){ 
								return console.error(err);
							} else {
							  //console.log("Multiple documents inserted to Collection");
							}
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




