import express from 'express';
import mongoose from 'mongoose';
import invoiceRoute from './router/invoiceRoute.js';
import userRoute from './router/userRoute.js'

const app = express();
const port = 3000;
mongoose.connect('mongodb://localhost:27017/bihariTraders')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/user/', userRoute);
app.use('/api/invoice', invoiceRoute);

app.listen(port, (req, res) => {
    console.log(`Connected to PORT ${port}...`)
})
