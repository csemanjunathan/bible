'use strict';
import express from 'express';
import { search, upload, getVersions, deleteVersions } from './search.controller';

const router = express.Router();

router.get('/', upload.none(), search);
router.get('/get-versions', getVersions);
router.delete('/:version', deleteVersions);

export default router;
