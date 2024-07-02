import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    releaseYear: String,
    genre: String,
    filePath: String,
    watched: { type: Boolean, default: false },
    review: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
    username: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Movie= mongoose.model('Movie', movieSchema);
export default Movie;
