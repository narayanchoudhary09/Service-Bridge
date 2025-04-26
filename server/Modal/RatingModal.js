import { mongoose } from "mongoose";


const RatingModal = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  rating: {
    type: Number,
    require: true
  },
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Worker',
    require: true
  }
});

const Rating = mongoose.model('Rating', RatingModal);
export default Rating;
