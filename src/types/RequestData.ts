import { ObjectId } from "mongodb";

interface RequestData {
    uid?: ObjectId;

    // Devnote
    title?: string;
    content?: string;
    language?: string;
    keys?: ObjectId[];
    key?: ObjectId;
    shareKey?: string;

    // MeetUp
    code?: string;
}

export default RequestData;