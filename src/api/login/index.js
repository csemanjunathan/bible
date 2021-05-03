'use strict';
import express from 'express';
import { login, test } from './login.controller';

const router = express.Router();

router.post('/login', login);

export default router;
