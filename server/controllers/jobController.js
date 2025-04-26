import { mongoose } from "mongoose";
import Category from "../Modal/CategoryModal.js";
import Job from "../Modal/JobModal.js";

export const createJob = async (req, res, next) => {
  try {
    const { name, description, images, categoryId, price, minHour, maxHour } = req.body;

    const category = await Category.findById(categoryId);

    console.log("Category:", category);
    if (!category) {
      return res.status(400).json({
        message: "Category not found",
        success: false
      });
    }

    const worker = req.worker;
    const { location } = worker;
    console.log(location);
    const { coordinates } = location;
    if(coordinates.length == 0){
      return res.status(400).json({
        message : "Please give access to your location",
        success : false
      })
    }
    console.log("Worker:", worker);
    const noOfHours = [minHour, maxHour];

    const createJob = await Job.create({
      title: name,
      description: description,
      images: images,
      workerId: worker._id,
      categoryId: category._id,
      location: worker.location,
      noOfHours: noOfHours,
      price: price
    });

    console.log("Created Job:", createJob);
    if (!createJob) {
      return res.status(400).json({
        message: "Job creation failed",
        success: false
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { $push: { jobs: createJob._id } },
      { new: true }
    );
    console.log("updatedcategory",updatedCategory)
    return res.status(200).json({
      job: createJob,
      message: "Job creation successful",
      success: true
    });
  } catch (error) {
    next(error);
  }
};
export const getJobDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allJobs = await Job.aggregate([
      {
        $match: {
          _id: mongoose.Types.ObjectId(id),
        }
      },
      {
        $lookup: {
          from: "Worker",
          localField: "workerId",
          foreignField: "_id",
          as: "worker"
        }
      },
      {
        $unwind: "$Worker"
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          noOfHours: 1,
          images: 1,
          price: 1,
          status: 1,
          worker: {
            _id: 1,
            phone: 1,
            name: 1,
            phone: 1,
            AverageRating: 1,
            profileImg: 1
          }
        }
      }
    ]);
    return res.status(200).json({
      jobs: allJobs,
      success: true,
    });
  } catch (e) {
    next(e);
  }
}

export const getJobStatus =async (req,res,next)=>{
  try{

  }catch(error){
    return res.status(400).json({
      success:false,
      message:"failed to get the job status"
    })
  }
}

