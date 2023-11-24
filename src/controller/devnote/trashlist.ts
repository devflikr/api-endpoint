
import DevNoteList, { DevNoteTrashListType } from "../../mongodb/models/devnote/DevNoteList";
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import { encryptString } from "../../util/crypto";

async function devnoteCtrlTrashList(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");

    try {
        const result: DevNoteTrashListType[] = [];
        const trashlist = await DevNoteList.find({
            uid,
            deletedAt: {
                $exists: true,
                $ne: null,
            },
            isPermanentlyDeleted: false,
        }).sort({ title: -1 });

        for (const note of trashlist) {
            result.push({
                id: note._id,
                key: encodeURIComponent(encryptString(note._id.toString())),
                uid: uid,

                title: note.title,

                deletedAt: note.deletedAt || new Date(),
            });
        }

        return successResponse(res, "", result);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default devnoteCtrlTrashList;