'use strict';
import express from 'express';
import { index, upload, uploadFile } from './upload.controller';
import { isAuth } from '../../auth/auth.service';

const router = express.Router();

router.get('/', isAuth(), index);
router.post('/', upload.single('book_zip'), uploadFile);

export default router;
