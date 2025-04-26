import Job from "../Modal/JobModal.js";
import sendSms from "../utils/sendNotification.js";
import Worker from "../Modal/workerModel.js"
export const getSearch = async (req, res, next) => {
  try {
    const { location } = req.user;
    const { coordinates } = location;
    if (!coordinates) {
      return res.status(400).json({ message: 'categoryId and coordinates are required' });
    }
    const jobs = await Job.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [coordinates] },
          distanceField: "distance",
          maxDistance: 50000,
          spherical: true
        }
      },
      {
        $lookup: {
          from: "Worker",
          localField: "workerId",
          foreignField: "_id",
          as: "Worker"
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
          distance: { $divide: ["$distance", 1000] },
          worker: {
            _id: 1,
            phone: 1,
            name: 1,
            phone: 1,
            profileImg: 1
          }
        }
      }
    ]);
    return res.status(200).json({
      success: true,
      data: jobs
    })
  } catch (error) {
    next(error);
  }
}

export const getJobByCategory = async (req, res, next) => {
  try {
    const { categoryId, minPrice, maxPrice } = req.body;
    const { location } = req.user;
    const { coordinates } = location;

    if (!coordinates) {
      return res.status(400).json({ message: 'Location access is required' });
    }
    const matchCondtion = {
      categoryId: mongoose.Types.ObjectId(categoryId),
    }
    if (minPrice !== undefined) {
      matchCondtion.price = { $gte: minPrice }
    }
    if (maxPrice !== undefined) {
      matchCondtion.price = { $lte: maxPrice }
    }
    if (maxPrice !== undefined && minPrice !== undefined) {
      matchCondtion.price = { $gte: minPrice, $lte: maxPrice }
    }
    const jobs = await Job.aggregate([
      {
        $match: matchCondtion
      },
      {
        $geoNear: {
          near: { type: "Point", coordinates: [coordinates] },
          distanceField: "distance",
          maxDistance: 50000,
          spherical: true
        }
      },
      {

        $unwind: "$Worker"
      },
      {
        $lookup: {
          from: "Worker",
          localField: "workerId",
          foreignField: "_id",
          as: "Worker"
        }
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
          distance: { $divide: ["$distance", 1000] },
          worker: {
            _id: 1,
            phone: 1,
            name: 1,
            phone: 1,
            profileImg: 1
          }
        }
      }
    ]);
    if (jobs.length === 0) {
      return res.status(200).json({
        message: "No Jobs are Found"
      })
    }
    return res.status(200).json({
      jobs,
      success: "Jobs Found"
    })
  } catch (e) {
    next(e);
  }
}

export const connectToEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({
        message: "Job not found",
        success: false,
      });
    }
    const { workerId } = job;
    const worker = await Worker.findById({
      _id: workerId
    });
    const message = await sendSms(worker.phoneNo, `This is message from the client click here to accept the deal https://service-bridge-liard.vercel.app/worker/user/connect/${id}`);
    return res.status(200).json({
      message: "Message sent to the worker will call you shortly",
      success: true,
    });

  } catch (error) {
    next(error);
  }
}
