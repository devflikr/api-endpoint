import throwError from "../tools/error";
import { ExpressNextFunction, ExpressRequest, ExpressResponse } from "../types/Express";
import RequestData from "../types/RequestData";

type DataKey<T extends keyof RequestData> = RequestData[T];

function setRequestData<T extends keyof RequestData>(req: ExpressRequest, key: T, value: DataKey<T>): true {
    req.reqData = req.reqData || {};
    req.reqData[key] = value;
    return true;
}

export default setRequestData;


export function validateRequestData(dataKeys: Array<keyof RequestData>) {
    return function (req: ExpressRequest, res: ExpressResponse, next: ExpressNextFunction) {
        if (!req.reqData) return throwError(res, 101);

        for (const key of dataKeys) {
            if (req.reqData[key] == null) return throwError(res, 102, key);
        }

        next();
    };
}