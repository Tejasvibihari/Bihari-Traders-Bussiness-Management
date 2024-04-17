import { otpGeneration, updateInventory, addInventory } from '../controllers/inventoryController.js';
import express from 'express';

const router = express.Router();


router.post('/addinventory', addInventory);
router.post('/otp', otpGeneration);
router.post('/updateinventory', updateInventory);

export default router;