
import DevNoteList, { DevNoteSharedNoteType } from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import DevNoteShared from "../../mongodb/models/devnote/DevNoteShared";
import { encryptString } from "flikr-utils";

async function devnoteCtrlSharedNote(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid, shareKey } = req.reqData;

    if (!shareKey) return throwError(res, 102, "sharedKey");

    try {
        const note = await DevNoteList.findOne({
            shareKey,
        });

        if (!note) return throwError(res, 505);

        if (note.deletedAt && !note.isPermanentlyDeleted) return throwError(res, 507);

        if (note.isPermanentlyDeleted) return throwError(res, 505);

        const result: DevNoteSharedNoteType = {
            id: note.id,
            key: encodeURIComponent(encryptString(note._id.toString(), process.env.CRYPTO_SECRET_KEY)),

            title: note.title,
            content: note.content,
            language: note.language,

            createdAt: note.createdAt,

            shareKey: note.shareKey,
        };

        if (uid && uid.toString() !== String(note.uid)) {
            await DevNoteShared.findOneAndUpdate({
                uid,
                shareKey,
            }, {
                $set: {
                    deleted: false,
                },
                $setOnInsert: {
                    uid,
                    shareKey,
                }
            }, {
                upsert: true,
                new: true,
                useFindAndModify: false,
            });
        }

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlSharedNote;