import express, { NextFunction, Request, Response } from "express";
import EmployeesModel from "../03-models/employees-model";
import logic from "../05-logic/employees-logic";

const router = express.Router();

//ראוט אשר מחזיר את כל העובדים 
router.get("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees = await logic.getAllEmployees();
     
        response.json(employees)
    }
    catch (err: any) {
        next(err);
    }
});


//ראוט אשר מקבל איידי ומחזיר את אותו עובד עם האיידי שהוזן 
router.get("/employees/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        const employees = await logic.getOneEmployees(id);
        response.json(employees);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מוסיף עובד חדש
router.post("/employees", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const employees = new EmployeesModel(request.body);
        const addedEmployees = await logic.addEmployees(employees);
        response.status(201).json(addedEmployees);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מעדכן מוצר קיים במלואו 
router.put("/employees/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.employeesID = id;
        const employees = new EmployeesModel(request.body);
        const updatedemployees = await logic.updateFullEmployees(employees);
        response.json(updatedemployees);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מעדכן באופן חלקי מוצר קיים
router.patch("/employees/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        request.body.employeesID = id;
        const employees = new EmployeesModel(request.body);
        console.log(employees);
        const updatedEmployees = await logic.updatePartialEmployees(employees);
        response.json(updatedEmployees);
    }
    catch (err: any) {
        next(err);
    }
});

//ראוט אשר מוחק מוצר
router.delete("/employees/:id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const id = +request.params.id;
        await logic.deleteEmployees(id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

import path from "path";
//ראוט אשר מושך תמונה לפי שם התמונה 
router.get("/employees/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "employees", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;