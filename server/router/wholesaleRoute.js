import express from 'express';
import { addWholesale, updateWholesale } from '../controllers/wholesaleController.js';

const router = express.Router();

router.post('/addwholsale', addWholesale);
router.post('/updatewholesale', updateWholesale);

export default router;