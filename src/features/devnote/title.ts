import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";

async function verifyDevNoteTitle(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const title = req.body["title"] as string;

    if (!title) return throwError(res, 501);

    setRequestData(req, "title", title);

    next();
}

export default verifyDevNoteTitle;