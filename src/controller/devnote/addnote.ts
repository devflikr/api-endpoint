
import { ShortId, encryptString } from "flikr-utils";
import DevNoteList from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

const shorter = ShortId();

async function devnoteCtrlAddNote(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid, title, content, language } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");
    if (!title) return throwError(res, 102, "title");
    if (!content) return throwError(res, 102, "content");
    if (!language) return throwError(res, 102, "language");

    try {
        const newnote = await DevNoteList.create({
            uid,
            title,
            content,
            language,
        });

        await newnote.updateOne({ shareKey: shorter.encode(newnote._id) });

        return successResponse(res, "Note added successfully", encodeURIComponent(encryptString(newnote._id.toString(), process.env.CRYPTO_SECRET_KEY)));
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlAddNote;