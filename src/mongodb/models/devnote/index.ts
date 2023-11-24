import mongoose from "mongoose";

const devnoteDB = mongoose.connection.useDb("devnote");

export default devnoteDB;