import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  content: {
    type: String,
    require: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    require: true
  }
});

const Review = mongoose.model('Review', ReviewSchema);
export default Review;
