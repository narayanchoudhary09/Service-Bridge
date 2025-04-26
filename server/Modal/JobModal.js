import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Worker"
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    require: true
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  price: {
    type: Number,
    required: true
  },
  noOfHours: {
    type: [Number],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    enum: ['Posted', 'Ordered', 'Rejected', 'Completed'],
    default: 'Posted'
  }
})
export const Job = mongoose.model('Job', jobSchema);
export default Job;

