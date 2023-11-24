import { ObjectId } from "mongodb";
import throwError from "../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";
import setRequestData from "./reqData";

async function verifyUserId(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    const uid = req.body["uid"] as string;

    if (!uid) return throwError(res, 201);

    try {
        const userId = new ObjectId(uid);

        if (!userId) return throwError(res, 202);

        setRequestData(req, "uid", userId);

    } catch (error) {
        return throwError(res, 202);
    }

    next();
}

export default verifyUserId;