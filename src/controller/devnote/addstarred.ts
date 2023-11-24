
import DevNoteList from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function devnoteCtrlAddToStarred(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid, keys } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");
    if (!keys) return throwError(res, 102, "keys");

    try {
        for (const key of keys) {
            await DevNoteList.updateOne({ _id: key, uid }, { starred: true, modifiedAt: Date.now() });
        }

        return successResponse(res, "Added to starred successfully");
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlAddToStarred;