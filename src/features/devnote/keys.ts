import { ObjectId } from "mongodb";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";
import { decryptString } from "flikr-utils";

async function verifyDevNoteKeys(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const keys = req.body["keys"] as string[];

    if (!keys || !keys.length) return throwError(res, 503);

    const result:ObjectId[] = [];

    for (const key of keys) {
        try {
            result.push(new ObjectId(decryptString(decodeURIComponent(key), process.env.CRYPTO_SECRET_KEY)));
        } catch (error) {
            return throwError(res, 504);
        }
    }

    setRequestData(req, "keys", result);

    next();
}

export default verifyDevNoteKeys;