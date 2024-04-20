import express from 'express';
import { addInvoice, deleteInvoice, getInvoices } from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/addinvoice', addInvoice);
router.delete('/deleteinvoice/:id', deleteInvoice)
router.post('/getinvoices', getInvoices)


export default router;