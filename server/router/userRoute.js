import express from 'express';
import { signUp } from '../controllers/userController.js';
import { signIn } from '../controllers/userController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;