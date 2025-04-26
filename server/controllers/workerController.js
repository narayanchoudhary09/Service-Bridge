import workerModel from '../Modal/workerModel.js';
import bcrypt from 'bcrypt';
import { createCookieWorker } from '../utils/createCookike.js';
import Job from '../Modal/JobModal.js';


export const register = async (req, res) => {

  try {
    const { name, password,phoneno } = req.body;
    console.log(req.body);
    if (!name  ||!password || !phoneno || !phoneno.countryCode || !phoneno.number) {
      return res.status(403).json({
        success: false,
        message: 'All fields are required',
      });
    }

    let existingUser = await workerModel.findOne({ phoneno });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Worker already exists, please try with email or login instead',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    let newUser = await workerModel.create({
      name,
      password: hashedPassword,
      phoneno
    });

    createCookieWorker(res,newUser._id,newUser);

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "user cannot be registered. please try again.",
    })
  }
};


export const login = async (req, res) => {
  try {
    const { password, phoneno } = req.body;
    if (!password || !phoneno || !phoneno.countryCode || !phoneno.number) {
    res.status(403).json({
      success:false,
      message:"Both the feilds are required"
    })
  }
  let worker =await workerModel.findOne({ phoneno: phoneno});

  if (!worker) {
    return res.status(404).json({
      success: false,
      message: "worker does not exist"
    });
  }

  const isMatch = await bcrypt.compare(password,worker.password);
  
  if (!isMatch) {
    return res.status(400), json({
      success: false,
      message:"Ivalid credentials"
    })
  }
    createCookieWorker(res, worker._id, worker);

    
  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Login failed, please try again',
    });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("cookieName", {
    seucre: false,
    sameSite: "strict",
    path: "/"
  })
  res.status(200);
  return res.json({
    sucess: true,
    message: "Logout Sucessful"
  })
};

export const getProfile = async (req, res) => {
  // Get profile logic
};

export const updateAddress = async (req, res) => {
  try {
    const { lat, lng } = req.body;
if(!lat || !lng){
  return res.status(403).json({
    success:false,
    message:"longitude and latitude both are required"
  })
}
    const workerId = req.worker._id
    
    const workerAdress = await workerModel.findById(workerId);

    if (!workerAdress) {
      res.status(404).json({
        success: false,
        message:"worker address not found"
      })
    }

    const location = {
      type: "Point",
      coordinates: [lng, lat],
    }

    //update address
    const updatedWorker = await workerModel.findByIdAndUpdate(
      workerId,
      { $set: { location } },
      {new:true}
    );

    if (!updatedWorker) {
      return res.status(400).json({
        success: false,
        message:"Error in updating the address"
      })
    }
    return res.status(200).json({
      success: true,
      message: 'Address updated successfully!',
      updatedWorker,
    })
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
}

export const updateProfile = async (req, res) => {
  if (req.worker._id != req.params.id) {
    return res.status(404).json({
      success: false,
      message: "You can only update your account"
    });
  }
  try {
    if (req.body.password) {
        req.body.password=bcrypt.hashSync(req.body.password,10)
    } 
    
    const updatedWorker = await workerModel.findByIdAndUpdate(req.params.id, {
    $set: {
        name: req.body.name,
        password: req.body.password,
        profileImg: req.body.profileImg,
        address:req.body.address
      },
    }, { new: true })
    
    //const { password, ...rest } = updatedWorker._doc
    return res.status(200).json({
      message: "Profile updated successfully",
      updatedWorker
    })

  } catch (error) {
    return res.status(500).json({
      message:"Internal server error "
    })
  }
}

//Fetching worker jobs
export const myJobs = async (req, res) => {
  const workerId = req.worker._id;
  console.log(workerId);

  try {
    const workerJobs = await Job.find({ workerId }).select('title categoryId description images price status createdAt');

    if (!workerJobs || workerJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No jobs found for this worker',
      });
    }
    
    return res.status(200).json({
      success: true,
      jobs: workerJobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

