import { ExpressResponse } from "../../types/Express";
import errors from "./errors";
import ErrorCode from "../../types/ErrorCode";

function throwError(res: ExpressResponse, errorKey: number, ...data: unknown[]) {

    const error = getErrorDataByKey(errorKey);

    const dataRes = data.length ? data : null;

    return res.status(error?.code || 404).json({
        error: true,
        status: "error",
        message: error?.message,
        code: error?.code,
        type: error?.type,
        data: dataRes,
    }), false;
}

export default throwError;

function getErrorDataByKey(key: number): ErrorCode | null {
    const errorChart = errors as unknown as { [key: string]: unknown };
    for (const host in errorChart) {
        const hostChart = errorChart[host] as { [key: string]: unknown };
        for (const path in hostChart) {
            const pathChart = hostChart[path] as { [key: string]: unknown };
            if (pathChart.key === key) {
                return pathChart as unknown as ErrorCode;
            }
        }
    }
    console.error("No error key found for", key);
    return null;
}