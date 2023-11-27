import ErrorCode from "../../types/ErrorCode";

export interface ErrorType {
    request: {
        invalid: ErrorCode; // 101
        unknown: ErrorCode; // 102
        error: ErrorCode; // 103
    };
    uid: {
        no_uid: ErrorCode; // 201
        invalid_object_id: ErrorCode; // 202
    };
    devnote: {
        no_title: ErrorCode; // 501
        no_content: ErrorCode; // 502
        no_keys: ErrorCode; // 503
        unresolved: ErrorCode; // 504
        noentry: ErrorCode; // 505
        restricted: ErrorCode; // 506
        deleted: ErrorCode; // 507
        shareKey: ErrorCode; // 508
    };
}

const errors: ErrorType = {
    request: {
        invalid: {
            key: 101,
            code: 404,
            type: "api/request/invalid-request",
            message: "Unable to find request values",
        },
        unknown: {
            key: 102,
            code: 404,
            type: "api/request/unknown-params",
            message: "Unable to find some request values",
        },
        error: {
            key: 103,
            code: 404,
            type: "api/request/unknown-error",
            message: "An unknown error occurred",
        },
    },
    uid: {
        no_uid: {
            key: 201,
            code: 400,
            type: "api/user-id/empty",
            message: "No user id was received with request",
        },
        invalid_object_id: {
            key: 202,
            code: 404,
            type: "api/user-id/invalid-object-id",
            message: "Unable to convert uid to a valid User Object",
        },
    },
    devnote: {
        no_title: {
            key: 501,
            code: 400,
            type: "devnote/title/empty",
            message: "Note title is empty",
        },
        no_content: {
            key: 502,
            code: 400,
            type: "devnote/content/empty",
            message: "Note content is empty",
        },
        no_keys: {
            key: 503,
            code: 400,
            type: "devnote/keys/empty",
            message: "No keys was received to perform upon",
        },
        unresolved: {
            key: 504,
            code: 400,
            type: "devnote/keys/unable-to-resolve",
            message: "Unable to resolve the note id",
        },
        noentry: {
            key: 505,
            code: 400,
            type: "devnote/note/no-entry-found",
            message: "No note with this note id exists",
        },
        restricted: {
            key: 506,
            code: 400,
            type: "devnote/note/access-denied",
            message: "You don't have access to this note",
        },
        deleted: {
            key: 507,
            code: 400,
            type: "devnote/note/trashed",
            message: "This note has been deleted",
        },
        shareKey: {
            key: 508,
            code: 400,
            type: "devnote/shared/invalid",
            message: "Share key is invalid",
        },
    },
};

export default errors;