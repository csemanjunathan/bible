'use strict';
import express from 'express';
import {
	index,
	upload,
	uploadFile
} from './upload.controller';

const router = express.Router();

router.get('/', index);
router.post('/', upload.single('book_zip'), uploadFile);

export default router;
