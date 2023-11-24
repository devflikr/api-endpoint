import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";

async function verifyDevNoteContent(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const content = req.body["content"] as string;

    if (!content) return throwError(res, 502);

    setRequestData(req, "content", content);

    next();
}

export default verifyDevNoteContent;