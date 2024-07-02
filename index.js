import dotenv from 'dotenv'
import connectDB from './db.js';
import cors from 'cors'
import bodyParser from 'body-parser';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
import moviesRoutes from './routes/moviesRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const port=process.env.PORT || 5000;

connectDB();

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/auth',authRoutes);
app.use('/api/movies',moviesRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port,()=>console.log(`Listening on port ${port}`))