
import { encryptString } from "flikr-utils";
import DevNoteList, { DevNoteTrueNoteContentType } from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function devnoteCtrlGetTrueNote(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid, key } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");
    if (!key) return throwError(res, 102, "key");

    try {
        const note = await DevNoteList.findById(key);

        if (!note) return throwError(res, 505);

        if (String(note.uid) !== uid.toString()) return throwError(res, 506);

        if (note.deletedAt && !note.isPermanentlyDeleted) return throwError(res, 507);

        if (note.isPermanentlyDeleted) return throwError(res, 505);

        const result: DevNoteTrueNoteContentType = {
            id: note.id,
            key: encodeURIComponent(encryptString(note._id.toString(), process.env.CRYPTO_SECRET_KEY)),
            uid: uid,

            title: note.title,
            content: note.content,
            language: note.language,

            createdAt: note.createdAt,
            modifiedAt: note.modifiedAt,

            starred: !!note.starred,

            shareKey: note.shareKey,
        };

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlGetTrueNote;