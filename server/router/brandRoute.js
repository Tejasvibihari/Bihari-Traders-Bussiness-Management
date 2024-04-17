import express from 'express';
import { createBrand, getBrand } from '../controllers/brandController.js';

const router = express.Router();

router.post('/createbrand', createBrand);
router.get('/getbrand', getBrand)

export default router;