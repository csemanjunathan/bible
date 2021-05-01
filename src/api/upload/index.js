'use strict';
import express from 'express';
import { index, upload, uploadFile } from './upload.controller';
import { isAuth } from '../../auth/auth.service';

const router = express.Router();

router.get('/', isAuth(), index);
router.post('/', uploadFile); 

// router.post('/', upload.single('book_zip'), uploadFile); 
// router.post('/test', test) 
export default router; 
