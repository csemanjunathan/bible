'use strict';
import express from 'express';
import {
	index,
	search,
	upload
} from './search.controller';

const router = express.Router();

router.get('/', index);
router.post('/', upload.none(), search);
export default router;
