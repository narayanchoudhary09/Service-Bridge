import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    job: {
        type: mongoose.Types.ObjectId,
        ref: 'Job',
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    worker: {
        type: mongoose.Types.ObjectId,
        ref: 'Worker',
    },
    
}, {
    timestamps: true,
});

module.exports = new mongoose.model('History', historySchema);