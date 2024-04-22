import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import invoiceRoute from './router/invoiceRoute.js';
import userRoute from './router/userRoute.js'
import inventoryRoute from './router/inventoryRoute.js';
import brandRouter from './router/brandRoute.js'
import wholesaleRouter from './router/wholesaleRoute.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000;
mongoose.connect("mongodb+srv://tejasvibihari2000:z1VS5wWSKyakzfds@bihari.kup0kde.mongodb.net/?retryWrites=true&w=majority")
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors({
    origin: 'https://bihari-traders.vercel.app',
    methods: ['GET', 'POST'], // Specify allowed HTTP methods
    credentials: true // Enable credentials
}));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.send("Hello")
})
app.use('/api/user/', userRoute);
app.use('/api/invoice', invoiceRoute);
app.use('/api/inventory', inventoryRoute);
app.use('/api/inventory/brand', brandRouter);
app.use('/api/inventory/wholesale', wholesaleRouter);

app.listen(port, (req, res) => {
    console.log(`Connected to PORT ${port}...`)
})
