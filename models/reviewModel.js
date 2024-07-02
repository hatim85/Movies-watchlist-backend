import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
    review: String,
    author: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    username: {type:mongoose.Schema.Types.String,ref:'User'},
    rating: {type:Number,default:0}
});

const Review= mongoose.model('Review', reviewSchema);
export default Review;