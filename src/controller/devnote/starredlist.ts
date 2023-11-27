
import { encryptString } from "flikr-utils";
import DevNoteList, { DevNoteListType } from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

async function devnoteCtrlStarredList(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");

    try {
        const result: DevNoteListType[] = [];
        const starredlist = await DevNoteList.find({
            uid,
            $or: [
                { deletedAt: { $exists: false } },
                { deletedAt: null }
            ],
            starred: true,
        }).sort({ title: -1 });

        for (const note of starredlist) {
            result.push({
                id: note._id,
                key: encodeURIComponent(encryptString(note._id.toString(), process.env.CRYPTO_SECRET_KEY)),
                uid: uid,

                title: note.title,

                createdAt: note.createdAt,
                modifiedAt: note.modifiedAt,

                starred: !!note.starred,

                shareKey: note.shareKey,
            });
        }

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlStarredList;