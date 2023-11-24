import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";

async function verifyDevNoteKey(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const sharable = req.body["sharable"] as string;

    let initial = null;

    if (sharable === "false") initial = false;
    if (sharable === "true") initial = true;

    setRequestData(req, "sharable", initial);

    next();
}

export default verifyDevNoteKey;