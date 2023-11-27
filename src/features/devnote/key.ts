import { ObjectId } from "mongodb";
import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";
import { decryptString } from "flikr-utils";

async function verifyDevNoteKey(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const key = req.body["key"] as string;

    if (!key) return throwError(res, 503);

    let key_id: ObjectId;

    try {
        key_id = new ObjectId(decryptString(decodeURIComponent(key), process.env.CRYPTO_SECRET_KEY));
    } catch (error) {
        return throwError(res, 504);
    }

    setRequestData(req, "key", key_id);

    next();
}

export default verifyDevNoteKey;