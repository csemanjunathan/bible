'use strict';
import express from 'express';
import {
	pingES,
	init,
	check,
	setting,
	mapping,
	add,
	update,
	open,
	close,
	searchES
} from '../../controllers/elasticsearch/elasticsearch.controller';
const router = express.Router();

router.get('/ping', pingES);
router.post('/index/init', init);
router.post('/index/check', check);
router.post('/index/open', open);
router.post('/index/close', close);
router.post('/index/setting', setting);
router.post('/index/mapping', mapping);
router.post('/add', add);
router.put('/add/:id', update);
router.get('/search', searchES);
export default router;
