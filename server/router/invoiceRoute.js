import express from 'express';
import { addInvoice, deleteInvoice, getInvoices, updateInvoice } from '../controllers/invoiceController.js';

const router = express.Router();

router.post('/addinvoice', addInvoice);
router.post('/deleteinvoice', deleteInvoice)
router.post('/getinvoices', getInvoices);
router.post('/updateInvoice', updateInvoice);


export default router;