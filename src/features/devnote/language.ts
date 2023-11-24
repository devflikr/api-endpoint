import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";

async function verifyDevNoteLanguage(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    let language = req.body["language"] as string;

    if (!language || !["plaintext", "css", "html", "javascript"].includes(language)) language = "plaintext";

    setRequestData(req, "language", language);

    next();
}

export default verifyDevNoteLanguage;