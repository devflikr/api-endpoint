import { ObjectId } from "mongodb";

interface RequestData {
    uid?: ObjectId;

    // Devnote
    title?: string;
    content?: string;
    language?: string;
    keys?: ObjectId[];
    key?: ObjectId;

    sharable?: boolean | null;
    shareKey: string;
    encryptionKey?: string;
}

export default RequestData;