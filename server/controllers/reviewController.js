import mongoose from "mongoose"
import Review from "../Modal/ReviewModal.js";
import WorkerModel from "../Modal/workerModel.js"

export const createReview = async (req, res) => {
  try {
    const userId = req.user._id;
    const { content } = req.body;
    const { workerId } = req.params;
    const workerDetails = await WorkerModel.findById(workerId);
    if (!workerDetails) {
      return res.status(404).json({
        success: false,
        message: "Worker is not there!!"
      })
    }

    const newreview = await Review.create({
      userId: userId,
      content: content,
      workerId: workerId
    })
    await WorkerModel.findByIdAndUpdate(workerId, {
      $push: {
        reviews: newreview._id,
      }
    })
    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      newreview,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: e.message,
    })
  }
}

export const getAllReview = async (req, res) => {
  try {
    const { workerId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid workerId",
      });
    }
    const allReviews = await Review.find({ workerId })
      .populate({
        path: "userId",
        select: "name profileImage email",
        model: 'User'
      })
      .populate({
        path: "workerId",
        select: "name  email profileImg"
      })
      .sort({ createdAt: -1 })
      .exec()

    if (allReviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this worker",
      });
    }
    return res.status(200).json({
      success: true,
      data: allReviews,
    })
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the reviews for the worker",
      error: e.message,
    })
  }
}
