
import DevNoteList from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function devnoteCtrlCreateNote(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { title, content, language } = req.reqData;

    if (!title) return throwError(res, 102, "title");
    if (!content) return throwError(res, 102, "content");
    if (!language) return throwError(res, 102, "language");

    try {
        const newnote = await DevNoteList.create({
            title,
            content,
            language,
        });

        return successResponse(res, "Note added successfully", newnote.shareKey);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlCreateNote;