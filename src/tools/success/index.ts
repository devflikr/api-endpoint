import { ExpressResponse } from "../../types/Express";

function successResponse(res: ExpressResponse, message: string, data?: unknown) {
    return res.json({
        success: true,
        status: "success",
        message: message,
        data: data,
    });
}

export default successResponse;