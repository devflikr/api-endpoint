
import DevNoteList from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function devnoteCtrlUpdateNote(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid, key, title, content, language } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");
    if (!key) return throwError(res, 102, "key");
    if (!title) return throwError(res, 102, "title");
    if (!content) return throwError(res, 102, "content");
    if (!language) return throwError(res, 102, "language");

    try {
        
        await DevNoteList.updateOne({ _id: key, uid }, { title, content, language, modifiedAt: Date.now() });

        return successResponse(res, "Note updated successfully successfully");
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlUpdateNote;