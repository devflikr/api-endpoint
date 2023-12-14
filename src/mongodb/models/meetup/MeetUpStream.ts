import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import meetupDB from ".";

const MeetUpStreamTimeStampSchema = new mongoose.Schema({
    created: {
        type: Date,
        required: true,
        default: Date.now,
    },
    // start: Date,
    // end: Date,
    ended: Date,
});

const MeetUpStreamSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        required: true,
    },

    code: {
        type: String,
        required: true,
    },

    stamps: MeetUpStreamTimeStampSchema,
});


const MeetUpStream = meetupDB.model("stream", MeetUpStreamSchema);

export default MeetUpStream;