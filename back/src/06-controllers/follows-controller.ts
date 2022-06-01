import express, { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import EmployeesModel from "../03-models/employees-model";
import logic from "../05-logic/employees-logic";
import followsLogic from "../05-logic/follows-logic";

const router = express.Router();


//בקשה אשר מוסיפה עוקב של יוזר על חופשה
router.post("/follows/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
       // request.body.image = request.files?.image;
       const vacationId = +request.params.id;

       // const vacation = new VacationModel(request.body);
       // const addedVacation = await logic.addVacation(vacation);
       const eransam:any = "eran check"
       console.log("log = eransam");

       let authorizationString = request.headers['authorization'];

       console.log("authorizationString: " , authorizationString);
       
       //יוצרים משתנה שלתוכו אנו מכניסים את היוזר איידי מתוך התוקן
       const userId = cyber.getUserFromToken(authorizationString).userId;

       await followsLogic.addFollow(userId, vacationId);


       response.status(201).send();
    } catch (error: any) {
      next(error);
    }
});





//בקשה אשר מבטלת את העוקב של יוזר על חופשה
router.delete("/follows/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {


console.log("eran");

      //יוצרים משתנה שיש בתוכו את ערך האיידי של החופשה המבוקשת
      const vacationId = +request.params.id;
      //יוצרים משתנה שלתוכו אנו מכניסים את הטוקן של היוזר שלנו
      let authorizationString = request.headers['authorization'];
      //יוצרים משתנה שלתוכו אנו מכניסים את היוזר איידי מתוך התוקן
      const userId = cyber.getUserFromToken(authorizationString).userId;
      //וכך אנו שולחים בקשה למחיקת המידע הנ''ל לפי פרטי היוזר והחופשה אשר 
      //הוא עוקב אחריה  מהדאטה בייס
      await followsLogic.unFollow(userId, vacationId);


       response.status(204).send();
    } catch (error: any) {
      next(error);
    }
});


export default router;
