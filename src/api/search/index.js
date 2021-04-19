'use strict';
import express from 'express';
import { search, upload } from './search.controller';

const router = express.Router();

router.post('/', upload.none(), search);
export default router;
