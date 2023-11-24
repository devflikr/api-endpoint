import { ObjectId } from "mongodb";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import { decryptString } from "../../util/crypto";
import setRequestData from "../reqData";

async function verifyDevNoteKeys(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const keys = req.body["keys"] as string[];

    if (!keys || !keys.length) return throwError(res, 503);

    const result:ObjectId[] = [];

    for (const key of keys) {
        try {
            result.push(new ObjectId(decryptString(decodeURIComponent(key))));
        } catch (error) {
            return throwError(res, 504);
        }
    }

    setRequestData(req, "keys", result);

    next();
}

export default verifyDevNoteKeys;