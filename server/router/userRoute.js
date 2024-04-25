import express from 'express';
import { signUp } from '../controllers/userController.js';
import { signIn } from '../controllers/userController.js';
import { forgotPassword } from '../controllers/userController.js';
import { resetPassword } from '../controllers/userController.js';
import { updateAccount } from '../controllers/userController.js'
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = 'uploads';

// Create 'uploads' directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const extension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extension)// Appending extension
    }
})

const upload = multer({ storage: storage });
const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);
router.post('/update', upload.single('image'), updateAccount)

export default router;