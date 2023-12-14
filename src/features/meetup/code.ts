import throwError from "../../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../../types/Express";
import setRequestData from "../reqData";

function verifyMeetUpCode(req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
    let code:string = req.body["code"] as string;
    code = code.trim();

    if (/[^a-zA-Z-]/g.test(code)) return throwError(res, 601);

    code = code.split("-").join("").toLowerCase();

    if (code.length !== 9) return throwError(res, 601);

    code = code.split("").reduce((acc, c, i) => acc + `${i !== 0 && i % 3 === 0 ? "-" : ""}${c}`, "");

    setRequestData(req, "code", code);

    next();
}

export default verifyMeetUpCode;