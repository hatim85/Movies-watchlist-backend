import express from 'express'
import Movie from '../models/movieModel.js';
import Review from '../models/reviewModel.js';

export const addMovies= async (req, res) => {
    try {
        const { title, description, releaseYear, genre } = req.body;
        const filePath = req.file ? req.file.path : null;
        const movie = new Movie({ title, description, releaseYear, genre, filePath });
        await movie.save();
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editMovie=async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, releaseYear, genre } = req.body;
        const filePath = req.file ? req.file.path : undefined;
        const updateData = { title, description, releaseYear, genre };
        if (filePath) updateData.filePath = filePath;
        
        const movie = await Movie.findByIdAndUpdate(id, updateData, { new: true });
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteMovie=async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByIdAndDelete(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json({ message: 'Movie deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getSingleMovie=async(req,res)=>{
        try {
            const { id } = req.params;
            const movie = await Movie.findById(id);
            if (!movie) return res.status(404).json({ error: 'Movie not found' });
            res.json(movie);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
}

export const getAllMovies=async(req,res)=>{
    try {
        const movie=await Movie.find();
        res.json(movie);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

export const togglewatch=async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        movie.watched = !movie.watched;
        await movie.save();
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const rating=async (req, res) => {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const movie = await Movie.findById(id);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        movie.rating = rating;
        await movie.save();
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const review= async (req, res) => {
    try {
        const { id } = req.params; // Movie ID
        const { user, review, rating } = req.body;

        // Create a new review
        const newReview = new Review({
            movieId: id, 
            review: review,
            username: user, 
            rating: rating,
        });

        await newReview.save();

        // const movie = await Movie.findById(id);
        // if (!movie) return res.status(404).json({ error: 'Movie not found' });

        // movie.review.push(newReview._id);
        // await movie.save();

        res.json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}