import { otpGeneration, updateInventory } from '../controllers/inventoryController.js';
import express from 'express';

const router = express.Router();

router.post('/otp', otpGeneration);
router.post('/updateinventory', updateInventory);

export default router;