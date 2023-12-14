import express from "express";
import verifyMeetUpCode from "../../features/meetup/code";
import meetupCtrlParseCode from "../../controller/meetup/parsecode";
import verifyUserId from "../../features/uid";
import meetupCtrlStartNew from "../../controller/meetup/startnew";
// import { ExpressRequest, ExpressResponse } from "../../types/Express";

const routerMeetUp = express.Router();

// function dummy(_: ExpressRequest, res: ExpressResponse) {
//     res.send("Using dummy response");
// }

routerMeetUp.post(
    "/parse-code",
    verifyMeetUpCode,
    meetupCtrlParseCode,
);

routerMeetUp.post(
    "/start-new",
    verifyUserId,
    meetupCtrlStartNew,
);

export default routerMeetUp;