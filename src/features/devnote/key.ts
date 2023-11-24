import { ObjectId } from "mongodb";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import { decryptString } from "../../util/crypto";
import setRequestData from "../reqData";

async function verifyDevNoteKey(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const key = req.body["key"] as string;

    if (!key) return throwError(res, 503);

    let key_id: ObjectId;

    try {
        key_id = new ObjectId(decryptString(decodeURIComponent(key)));
    } catch (error) {
        return throwError(res, 504);
    }

    setRequestData(req, "key", key_id);

    next();
}

export default verifyDevNoteKey;