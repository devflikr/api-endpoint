import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import devnoteDB from ".";

const DevNoteListSchema = new mongoose.Schema({
    uid: {
        type: ObjectId,
        required: true,
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
        default: Date.now(),
    },
    modifiedAt: {
        type: Date,
        required: true,
        default: Date.now(),
    },
    deletedAt: {
        type: Date,
    },

    shareKey: {
        type: String,
    },

    encryptionKey: {
        type: String,
    },
    starred: {
        type: Boolean,
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
}

export interface DevNoteSharableType {
    id: ObjectId;
    key: string;
    uid: ObjectId;

    isSharable: boolean;

    shareKey?: string;
    encryptionKey?: string;
}

export interface DevNoteTrashListType {
    id: ObjectId;
    key: string;
    uid: ObjectId;

    title: string;

    deletedAt: Date;
}

const DevNoteList = devnoteDB.model("devnote-list", DevNoteListSchema);

export default DevNoteList;