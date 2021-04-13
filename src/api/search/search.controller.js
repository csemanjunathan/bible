/* eslint-disable no-prototype-builtins */
/**
 * Using standard endpoints.
 *
 */

'use strict';
import { resourceModel } from '../../config/resource';
const multer = require('multer')

export const index = async (req, res) => {
	res.render('search');
};

export const search = async (req, res) => {
	const search_word = req.body.search_word;
    resourceModel['book'].find({ "text": { "$regex": search_word, "$options": "i" } },
        function(err, docs) {
			console.log(err);
            console.log(docs);
			if (docs) {
				res.render('search', docs); 
			}
        })
};

export const upload = multer({
    fileFilter (req, file, cb) {
        if(!file.originalname.endsWith('.zip')){
            return cb(new Error('Please upload zip file'))
        }
        cb(undefined,true)
    }
});
