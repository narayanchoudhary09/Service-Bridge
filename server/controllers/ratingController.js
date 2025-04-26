import mongoose from 'mongoose';
import Rating from "../Modal/RatingModal.js";
import WorkerModel from "../Modal/workerModel.js"

export const createRating = async (req, res) => {
  try {
    const userId = req.user.id
    const { rating} = req.body
   const {workerId }= req.params

    const workerDetails = await WorkerModel.findOne({
      _id: workerId
    })
    if (!workerDetails) {
      return res.status(404).json({
        success: false,
        message: "worker is not there!!"
      })
    }

    const alreadyRatingGiven = await Rating.findOne({
      userId: userId,
      workerId: workerId
    })

    if (alreadyRatingGiven) {
      return res.status(403).json({
        success: false,
        message: "worker already rated by the user"
      })
    }

    const newrating = await Rating.create({
      userId: userId,
      rating: rating,
      workerId: workerId
    })
    await WorkerModel.findByIdAndUpdate(workerId, {
      $push: {
        ratings: newrating._id,
      }
    })
    return res.status(201).json({
      success: true,
      message: "Rating created successfully",
      newrating,
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




export const getAverageRating = async (req, res) => {
  try {
    const { workerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid workerId",
      });
    }

    const worker = await WorkerModel.findById(workerId).populate('ratings');
    if (!worker) {
      return res.status(404).json({
        success: false,
        message: "Worker not found",
      });
    }

    const ratings = worker.ratings;
    if (ratings.length === 0) {
      return res.status(200).json({
        success: true,
        averageRating: 0,
      });
    }

    const sum = ratings.reduce((acc, rating) => acc + rating.rating, 0); 
    const averageRating = sum / ratings.length;

    return res.status(200).json({
      success: true,
      averageRating: averageRating,
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the worker",
      error: e.message,
    });
  }
};


export const getAllRating = async (req, res) => {
  try {
    const { workerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(workerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid workerId",
      });
    }
    const allRatings = await Rating.find({ workerId: workerId })
      .sort({ rating: "desc" })
      .populate({
        path: 'userId',
        select: 'name profileImage email' 
      })
      .populate({
        path: 'workerId',
        select: 'name email profileImg' 
      })
      .exec();

    if (allRatings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No ratings found for this worker",
      });
    }

    res.status(200).json({
      success: true,
      data: allRatings,
    });
  } catch (e) {
    console.error(e)
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve the rating for the worker",
      error: e.message,
    })
  }
}
