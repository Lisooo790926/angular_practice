import { Data } from "@angular/router";
import { Server } from "./server";

export interface CustomResponse {
    timeStamp: Data;
    statusCode: number;
    status: string;
    reason: string;
    message: string;
    developerMessage: string;
    data: {servers?: Server[], server?: Server, error?: string, deleted? : boolean};
    // add ? is making this as Optional
}