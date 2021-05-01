'use strict';
import express from 'express';
import { search, upload } from './search.controller';

const router = express.Router();

router.get('/', upload.none(), search);

// router.get('/versions', versions);

export default router;
