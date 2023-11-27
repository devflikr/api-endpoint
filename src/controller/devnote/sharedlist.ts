
import { encryptString } from "flikr-utils";
import DevNoteList from "../../mongodb/models/devnote/DevNoteList";
import DevNoteShared, { DevNoteSharedListType } from "../../mongodb/models/devnote/DevNoteShared";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function devnoteCtrlSharedList(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");

    try {
        const result: DevNoteSharedListType[] = [];
        const sharedlist = await DevNoteShared.find({
            uid,
        });

        for (const share of sharedlist) {
            const note = await DevNoteList.findOne({ shareKey: share.shareKey });
            if (!note) continue;
            if (note.deletedAt || note.isPermanentlyDeleted) continue;

            result.push({
                id: note._id,
                key: encodeURIComponent(encryptString(note._id.toString(), process.env.CRYPTO_SECRET_KEY)),

                title: note.title,
                content: note.content,
                language: note.language,

                sharedAt: share.sharedAt,

                shareKey: note.shareKey,
            });
        }

        result.sort((a, b) => b.title.localeCompare(a.title));

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlSharedList;