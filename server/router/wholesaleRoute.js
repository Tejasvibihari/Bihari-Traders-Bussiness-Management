import express from 'express';
import { addWholesale, updateWholesale, getWholesale } from '../controllers/wholesaleController.js';

const router = express.Router();

router.post('/addwholsale', addWholesale);
router.post('/updatewholesale', updateWholesale);
router.post('/getwholesale', getWholesale);

export default router;