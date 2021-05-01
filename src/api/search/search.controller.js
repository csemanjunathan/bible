/* eslint-disable no-prototype-builtins */
/**
 * Using standard endpoints.
 *
 */

'use strict';
import { resourceModel } from '../../config/resource';
import { sendRsp, responseHandler } from '../../utils/response';
const multer = require('multer');

export const versions = async (req,res) => {
    try{
        // return sendRsp(res, 200, req.trans('OK'), {
        //     ...response
        // }) 
    } catch(error){
        // console.log(error)
        // return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
    }
}

export const search = async (req, res) => {
    try {
        //console.log(req.query);
        const { search_word } = req.query;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 100;
        const skip = limit * page - limit;
        const sort = {
            chapter: req.query.sort ? req.query.sort : 1,
            verse: req.query.sort ? req.query.sort : 1
        };
        req.options = {
            limit,
            skip,
            sort
        };
        
        let queryObj = {}; 
     

        if(search_word.indexOf(":") > 0){

            let splitedVal = search_word.split(':');
            let verse = splitedVal[1];
            let splitedVal2 = splitedVal[0].split(' ');
            let chapter = splitedVal2[splitedVal2.length-1];
            splitedVal2.pop();
            let bookName = splitedVal2.join(' ');

            queryObj = { $or: [{"book":bookName, "verse":verse, "chapter":chapter}, {"tags" : {$all: [bookName]}, "verse":verse, "chapter":chapter}] };

        } else {
             
            let splitArr1 = search_word.split(' ');
            let CountOfSplitArr = splitArr1.length;
            let lastValue = splitArr1[CountOfSplitArr-1];
            
            if(isNaN(splitArr1[CountOfSplitArr-1])){
                let bookName = splitArr1.join(' ');
                queryObj = { $or: [ { "book": bookName }, { "tags": { $all: [bookName] } } ] };
            } else { 
                let chapter = lastValue;
                splitArr1.pop();
                let bookName = splitArr1.join(' ');
                queryObj = { $or: [{"book":bookName, "chapter":chapter},{ "tags": { $all: [bookName] } , "chapter":chapter }]}
            }


        }

        //queryObj = { "text": { "$regex": search_word, "$options": "i"}, "version":search_version};

        const booksCount = await countRows('book', queryObj);
        const books = await resourceModel['book']
            .find(
                queryObj,
                '-__v',
                req.options
            )
            .lean();
        console.log(books)
        const pages = Math.ceil(booksCount / req.options.limit);
        const response = responseHandler(books, booksCount, page, pages);
        return sendRsp(res, 200, req.trans('OK'), {
            ...response
        });
    } catch (error) {
        console.log(error)
        return sendRsp(res, 500, req.trans('fetch_failed'), {}, error);
    }
};

export const upload = multer({
	fileFilter (req, file, cb) {
		if (!file.originalname.endsWith('.zip')) {
			return cb(new Error('Please upload zip file'));
		}
		cb(true);
	}
});

export const countRows = (modelName, queryObj) => {
	return new Promise((resolve, reject) => {
		resourceModel[modelName]
			.countDocuments(queryObj)
			.then((count) => {
				resolve(count);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
