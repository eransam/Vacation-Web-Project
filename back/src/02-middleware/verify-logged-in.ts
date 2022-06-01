import { NextFunction, Request, Response } from "express";
import ErrorModel from "../03-models/error-model";
import cyber from "../01-utils/cyber";

async function verifyLoggedIn(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorizationHeader = request.header("authorization"); // Suppose to be "Bearer the-token"
   // console.log("authorizationHeader: " , authorizationHeader);
    
    const isValid = await cyber.verifyToken(authorizationHeader);

    if(!isValid) {
    next(new ErrorModel(401, "you are not log in!"));
    
    }

    next();
}

export default verifyLoggedIn;