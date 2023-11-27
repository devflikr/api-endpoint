import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";

async function verifyDevNoteShareKey(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const shareKey = req.body["shareKey"] as string;

    if (!shareKey) return throwError(res, 508);

    setRequestData(req, "shareKey", shareKey);

    next();
}

export default verifyDevNoteShareKey;