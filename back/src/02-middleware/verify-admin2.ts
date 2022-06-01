
import { NextFunction, Request, Response } from "express";
import ErrorModel from "../03-models/error-model";
import cyber from "../01-utils/cyber";
import jwtDecode from "jwt-decode";

async function verifyAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {

    const authorizationHeader = request.header("authorization"); // Suppose to be "Bearer the-token"

    console.log("authorizationHeader: " , authorizationHeader);

    const isValid = await cyber.verifyToken(authorizationHeader);

    const encodedObject: any = jwtDecode(authorizationHeader);

    const role:any = cyber.getUserFromToken(authorizationHeader).role;
    console.log("role: " , role);
    
const testa:any = role!="admin";
console.log("testa: " , testa);


    if(role!="admin") {
    next(new ErrorModel(401, "you are not admin!"));
    }

    next();
}

export default verifyAdmin;