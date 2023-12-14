
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import MeetUpStream from "../../mongodb/models/meetup/MeetUpStream";

async function meetupCtrlParseCode(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { code } = req.reqData;

    if (!code) return throwError(res, 102, "code");
    try {
        const existingStream = await MeetUpStream.findOne({ code });

        if (!existingStream) return throwError(res, 602);

        if (existingStream.stamps?.ended && existingStream.stamps.ended.getTime() - Date.now() < 0) return throwError(res, 602);

        return successResponse(res, existingStream.code);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default meetupCtrlParseCode;