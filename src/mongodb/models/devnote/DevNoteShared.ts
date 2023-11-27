import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import devnoteDB from ".";

const DevNoteSharedSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        required: true,
    },

    shareKey: {
        type: "string",
        required: true,
    },

    sharedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },

    deleted: {
        type: Boolean,
        default: false,
    },
});

export interface DevNoteSharedListType {
    id: ObjectId;
    key: string;

    title: string;
    content: string;
    language: string;

    sharedAt: Date;

    shareKey: string;
}


const DevNoteShared = devnoteDB.model("devnote-share", DevNoteSharedSchema);

export default DevNoteShared;