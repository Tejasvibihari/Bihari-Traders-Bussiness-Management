import express from 'express';
import { signUp } from '../controllers/userController.js';
import { signIn } from '../controllers/userController.js';
import { forgotPassword } from '../controllers/userController.js';
import { resetPassword } from '../controllers/userController.js';
import { updateAccount } from '../controllers/userController.js'

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.post('/update', updateAccount)

export default router;