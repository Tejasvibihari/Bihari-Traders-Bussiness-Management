import { otpGeneration, updateInventory, addInventory, getInventory } from '../controllers/inventoryController.js';
import express from 'express';

const router = express.Router();


router.post('/addinventory', addInventory);
router.post('/otp', otpGeneration);
router.post('/updateinventory', updateInventory);
router.post('/getinventory', getInventory);

export default router;