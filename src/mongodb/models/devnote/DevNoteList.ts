import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import devnoteDB from ".";
import { uuid } from "flikr-utils";

const DevNoteListSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
    },

    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        required: true,
        default: "plaintext",
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    modifiedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    deletedAt: {
        type: Date,
    },

    shareKey: {
        type: String,
        required: true,
        default: uuid,
        unique: true,
    },

    starred: {
        type: Boolean,
        required: true,
        default: false,
    },

    isPermanentlyDeleted: {
        type: Boolean,
        default: false,
    },
});

export interface DevNoteListType {
    id: ObjectId;
    key: string;
    uid: ObjectId;

    title: string;

    createdAt: Date;
    modifiedAt: Date;

    starred: boolean;

    shareKey: string;
}

export interface DevNoteTrueNoteContentType {
    id: ObjectId;
    key: string;
    uid: ObjectId;

    title: string;
    content: string;
    language: string;

    createdAt: Date;
    modifiedAt: Date;

    starred: boolean;

    shareKey: string;
}

export interface DevNoteTrashListType {
    id: ObjectId;
    key: string;
    uid: ObjectId;

    title: string;

    deletedAt: Date;
}

export interface DevNoteSharedNoteType {
    id: string;
    key: string;

    title: string;
    content: string;
    language: string;

    createdAt: Date;

    shareKey: string;
}

const DevNoteList = devnoteDB.model("devnote-list", DevNoteListSchema);

export default DevNoteList;