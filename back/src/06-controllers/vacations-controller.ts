import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/vacation-logic";
import VerifyLoggedInn from "../02-middleware/verify-logged-in";
import vacationsLogic from "../05-logic/vacation-logic";
import verifyAdminn from "../02-middleware/verify-admin2";

const router = express.Router();

//ראוט אשר מחזיר את כל המוצרים 
router.get("/vacations", VerifyLoggedInn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        let authorizationString = request.headers.authorization;
        
        const userId:any = cyber.getUserFromToken(authorizationString).userId;
        
        const vacations = await vacationsLogic.getAllVacations(userId)
        response.json(vacations)
       
        
    }
    catch (err: any) {
        next(err);
    }
});






//ראוט אשר מקבל איידי ומחזיר את אותו מוצר עם האיידי שהוזן 
router.get("/vacations/:id",VerifyLoggedInn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const vacation = await logic.getOneVacation(id);
        response.json(vacation);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מוסיף מוצר חדש
router.post("/vacations",verifyAdminn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מעדכן מוצר קיים במלואו 
router.put("/vacations/:id",verifyAdminn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.id = id;
        request.body.image = request.files?.image;

        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updateFullVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מעדכן באופן חלקי מוצר קיים
router.patch("/vacations/:id",verifyAdminn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.vacationId = id;
        console.log("request.body: ", request.body);
        
        const vacation = new VacationModel(request.body);
        const updatedVacation = await logic.updatePartialVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


//ראוט אשר מוחק מוצר
router.delete("/vacations/:id",verifyAdminn, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteVacation(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});






import path from "path";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import cyber from "../01-utils/cyber";
import VacationModel from "../03-models/vacation-model";
import verifyAdmin from "../02-middleware/verify-admin2";
//ראוט אשר מושך תמונה לפי שם התמונה 
router.get("/vacations/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "vacations", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;