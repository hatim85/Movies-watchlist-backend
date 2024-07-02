import express from 'express'
import mongoose from 'mongoose';
import multer from 'multer';
import Movie from '../models/movieModel.js';
import Review from '../models/reviewModel.js';
import { addMovies, deleteMovie, editMovie, getAllMovies, getSingleMovie, rating, review, togglewatch } from '../controllers/movieController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/addMovies', upload.single('file'), addMovies);
router.put('/editMovie/:id', upload.single('file'), editMovie);
router.delete('/delete/:id', deleteMovie);
router.get('/getSingleMovie/:id', getSingleMovie);
router.get('/getMovies',getAllMovies);
router.put('/:id/toggle-watched', togglewatch);
router.put('/rate/:id', rating);
router.post('/review/:id',review);

export default router;