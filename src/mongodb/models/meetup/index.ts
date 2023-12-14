import mongoose from "mongoose";

const meetupDB = mongoose.connection.useDb("meetup");

export default meetupDB;