import { otpGeneration } from '../controllers/inventoryController.js';
import express from 'express';

const router = express.Router();

router.post('/otp', otpGeneration);

export default router;