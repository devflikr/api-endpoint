
import DevNoteList, { DevNoteListType } from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import { encryptString } from "../../util/crypto";

async function devnoteCtrlNoteList(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");

    try {
        const result: DevNoteListType[] = [];
        const notelist = await DevNoteList.find({
            uid,
            $or: [
                { deletedAt: { $exists: false } },
                { deletedAt: null }
            ],
        }).sort({ title: -1 });

        for (const note of notelist) {
            result.push({
                id: note._id,
                key: encodeURIComponent(encryptString(note._id.toString())),
                uid: uid,

                title: note.title,

                createdAt: note.createdAt,
                modifiedAt: note.modifiedAt,

                starred: !!note.starred,
            });
        }

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlNoteList;