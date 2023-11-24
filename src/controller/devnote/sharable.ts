
import DevNoteList, { DevNoteSharableType } from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import { encryptString } from "../../util/crypto";

async function devnoteCtrlSharable(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid, key } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");
    if (!key) return throwError(res, 102, "key");

    try {
        const note = await DevNoteList.findOne({
            _id: key,
            uid,
        });

        if (!note) return throwError(res, 505);

        if (note.deletedAt && !note.isPermanentlyDeleted) return throwError(res, 507);

        if (note.isPermanentlyDeleted) return throwError(res, 505);

        const result: DevNoteSharableType = {
            id: note.id,
            key: encodeURIComponent(encryptString(note._id.toString())),
            uid: uid,

            isSharable: !!note.shareKey,
        };

        if (!result.isSharable) return successResponse(res, "", result);

        result.encryptionKey = note.encryptionKey;
        result.expiresAt = note.expiresAt;
        result.shareKey = note.shareKey;

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlSharable;