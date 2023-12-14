
import throwError from "../../tools/error";
import successResponse from "../../tools/success";
import { ExpressRequest, ExpressResponse } from "../../types/Express";
import MeetUpStream from "../../mongodb/models/meetup/MeetUpStream";
import generateMeetUpCodeWithCheck from "../../features/meetup/generator";

async function meetupCtrlStartNew(req: ExpressRequest, res: ExpressResponse) {

    if (!req.reqData) return throwError(res, 101);

    const { uid } = req.reqData;

    if (!uid) return throwError(res, 102, "uid");
    try {
        const code = await generateMeetUpCodeWithCheck();

        await MeetUpStream.create({
            uid,
            code,
        });

        return successResponse(res, code);
    } catch (error) {
        console.error(error);
        return throwError(res, 103);
    }
}

export default meetupCtrlStartNew;

