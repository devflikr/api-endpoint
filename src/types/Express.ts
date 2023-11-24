import { NextFunction, Request, Response } from "express";
import RequestData from "./RequestData";

export interface ExpressRequest extends Request {
    reqData?: RequestData;
}

export interface ExpressResponse extends Response {

}

export interface ExpressNextFunction extends NextFunction {

}