import express from "express";
import { ExpressRequest, ExpressResponse } from "../../types/Express";

import verifyUserId from "../../features/uid";
import verifyDevNoteKey from "../../features/devnote/key";
import verifyDevNoteKeys from "../../features/devnote/keys";
import verifyDevNoteTitle from "../../features/devnote/title";
import verifyDevNoteContent from "../../features/devnote/content";
import verifyDevNoteLanguage from "../../features/devnote/language";

import devnoteCtrlAddNote from "../../controller/devnote/addnote";
import devnoteCtrlNoteList from "../../controller/devnote/notelist";
import devnoteCtrlTrashList from "../../controller/devnote/trashlist";
import devnoteCtrlUpdateNote from "../../controller/devnote/updatenote";
import devnoteCtrlMoveToTrash from "../../controller/devnote/movetotrash";
import devnoteCtrlStarredList from "../../controller/devnote/starredlist";
import devnoteCtrlGetTrueNote from "../../controller/devnote/gettruenote";
import devnoteCtrlAddToStarred from "../../controller/devnote/addstarred";
import devnoteCtrlTrashForever from "../../controller/devnote/trashforever";
import devnoteCtrlRestoreFromTrash from "../../controller/devnote/restoretrash";
import devnoteCtrlRemoveFromStarred from "../../controller/devnote/removestarred";
import devnoteCtrlSharable from "../../controller/devnote/sharable";
import devnoteCtrlShareNote from "../../controller/devnote/sharenote";

const routerDevNote = express.Router();

// Get all notes for dashboard
routerDevNote.post(
    "/notelist",
    verifyUserId,
    devnoteCtrlNoteList,
);

routerDevNote.post(
    "/trashlist",
    verifyUserId,
    devnoteCtrlTrashList,
);

routerDevNote.post(
    "/starredlist",
    verifyUserId,
    devnoteCtrlStarredList,
);

routerDevNote.post(
    "/addnote",
    verifyUserId,
    verifyDevNoteTitle,
    verifyDevNoteContent,
    verifyDevNoteLanguage,
    devnoteCtrlAddNote,
);

routerDevNote.post(
    "/updatenote",
    verifyUserId,
    verifyDevNoteKey,
    verifyDevNoteTitle,
    verifyDevNoteContent,
    verifyDevNoteLanguage,
    devnoteCtrlUpdateNote,
);

routerDevNote.post(
    "/sharablenote",
    verifyUserId,
    verifyDevNoteKey,
    devnoteCtrlSharable,
);

routerDevNote.post(
    "/sharenote",
    verifyUserId,
    verifyDevNoteKey,
    devnoteCtrlShareNote,
);

routerDevNote.post(
    "/gettruenote",
    verifyUserId,
    verifyDevNoteKey,
    devnoteCtrlGetTrueNote,
);


routerDevNote.post(
    "/movetotrash",
    verifyUserId,
    verifyDevNoteKeys,
    devnoteCtrlMoveToTrash,
);

routerDevNote.post(
    "/restoretrash",
    verifyUserId,
    verifyDevNoteKeys,
    devnoteCtrlRestoreFromTrash,
);

routerDevNote.post(
    "/trashforever",
    verifyUserId,
    verifyDevNoteKeys,
    devnoteCtrlTrashForever,
);

routerDevNote.post(
    "/addstarred",
    verifyUserId,
    verifyDevNoteKeys,
    devnoteCtrlAddToStarred,
);

routerDevNote.post(
    "/removestarred",
    verifyUserId,
    verifyDevNoteKeys,
    devnoteCtrlRemoveFromStarred,
);

routerDevNote.get(
    "/",
    dummyResponse,
);

function dummyResponse(req: ExpressRequest, res:ExpressResponse) {
    return res.status(404).send("Using dummy response");
}

export default routerDevNote;