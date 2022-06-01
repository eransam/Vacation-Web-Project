import { OkPacket } from "mysql";
import ErrorModel from "../03-models/error-model";
import EmployeesModel from "../03-models/employees-model";
import dal from "../04-dal/dal";
import axios from "axios";
import {toJSON, fromJSON} from 'flatted';


//פה אנו יוצרים פונקציות
async function getAllEmployees(): Promise<EmployeesModel[]> {
    //אנו יוצרים משתנה עם שאילתת אסקיואל
    const sql = `SELECT
    employeeID AS employeesID,
    firstName AS firstName,
    lastName AS lastName,
    birthDate AS birthDate,
    city,
    CONCAT(employeeID, '.jpg') AS imageName 
    FROM employees`;

    //יוצרים משתנה ומבצעים לתוכו בקשה לדאטה בייס עם השאילתה שיצרנו קודם לכן
    const employees = await dal.execute(sql);
    //אנו מחזירים את המשתנה שמכיל בתוכו את התשובה מהבקשה שלנו 
    //שבמקרה שלנו התשובה זה כל המוצרים מהדאטה בייס
    return employees;
}



//פה אנו יוצרים פונ' שמחזירה לנו רק מוצר אחד
async function getOneEmployees(id: number): Promise<EmployeesModel> {
    const sql = `SELECT
    employeeID AS employeesID,
    firstName AS 'firstName',
    lastName AS 'lastName',
    birthDate AS 'birthDate',
    city,
    CONCAT(ProductID, '.jpg') AS imageName 
    FROM employees
                    WHERE EmployeeID = ${id}`;

    const allEmployees = await dal.execute(sql);

    //הדאטה בייס תמיד מחזיר לנו מערך ובשביל לקבל את האובייקט היחיד המבוקש אנו מבקשים את תא 
    //מס' אפס מהמערך שהוחזר
    //וכך המשתנה שלנו יכיל את אובייקט המוצר היחיד באופן רגיל
    //(לא בתוך מערך)
    const Employees = allEmployees[0];

    if(!Employees) throw new ErrorModel(404, `id ${id} not found`);

    return Employees;
}

//פונ' שמוסיפה מוצר 
//מקבלת לפרמטר את המוצר שאותו אנו רוצים להוסיף 
async function addEmployees(Employees: EmployeesModel): Promise<EmployeesModel> {

    //בודקת בדיקות ולידציה שאותם עשינו בקובץ המודל
    const errors = Employees.validatePost();
    if (errors) throw new ErrorModel(400, errors);



    //יוצרים שאילתה שמכניסה את המוצר שאנו רוצים להוסיף לדאטה בייס
    //בשורה הזו אנו רושמים לאיזה טבלה אנו רוצים להוסיף ובאיזה מקומות
    //אנו אומרים מה אנו רוצים להוסיף וזה בידיוק לפי סדר הנמצא בסוגריים שמעל VALUES ןבסוגריים של ה
    const sql = `INSERT INTO employees(FirstName, LastName, BirthDate, City)
                 VALUES('${Employees.firstName}','${Employees.lastName}','${Employees.birthDate}','${Employees.city}')`;

                //כך אנו מקבלים את כל הנתונים מהשאילתה כולל את מס האידי שהולך להתווסף
                 const info: OkPacket = await dal.execute(sql);

                 //ולאחר שמוצר זה התווסף וקיבל איידי אוטומטי אנו נזין למוצר שלנו גם את ערך האיידי
                 //אנו נציג למשתמש את ערך האיידי של המוצר שהתווסף return וכך גם ב 
                 Employees.employeesID = info.insertId;

    return Employees;
}

//פונ' עדכון מוצר מלא
async function updateFullEmployees(Employees: EmployeesModel): Promise<EmployeesModel> {

    //בדיקת ולידציה
    const errors = Employees.validatePut();
    if (errors) throw new ErrorModel(400, errors);

    //יצירת שאילתה
    const sql = `UPDATE Employees SET
                FirstName = '${Employees.firstName}',
                lastName = '${Employees.lastName}',
                BirthDate = '${Employees.birthDate}',
                City = '${Employees.city}'
                WHERE EmployeeID = ${Employees.employeesID}`;

    //זה הודעה שהמערכת מציגה כאשר מוצר לדוגמא עודכן בהצלחה והיא מכילה את כל הנתונים של המוצר OkPacket
    const info: OkPacket = await dal.execute(sql);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${Employees.employeesID} not found`);

    return Employees;
}

//פונקציה המעדכנת מוצר חלקי 
//לתוך הפרמטר אנחנו מכניסים את אובייקט המוצר שאותו עדכנו 
async function updatePartialEmployees(Employees: EmployeesModel): Promise<EmployeesModel> {

    //בדיקת ולידציה
    const errors = Employees.validatePatch();
    if (errors) throw new ErrorModel(400, errors);

    //פה אנו מכניסים לתוך המשתנה שלנו את המוצר המלא לפני העדכון שאותו אנו רוצים לעדכן חלקית
    const dbEmployees = await getOneEmployees(Employees.employeesID);
    const dbEmployeesDate = dbEmployees.birthDate;
    const dateString = dbEmployeesDate.toString();
    console.log(dateString);
    dbEmployees.birthDate = dateString;
    

    //פה אנו מבצעים על המוצר המעודכן לולאת פרופ
    for(const prop in Employees) {
        //במידה ויש ערך לפרופרטי זאת אומרת שבמידה ושלחו בפונקציה פרופרטי מסויים מעודכן 
        //אנו נכנס לתנאי ונשתה את הפרופרטי המקורי במעודכן 
        //זאת אומרת שלא רצו לעדכן או לשנות את אותו הפרופרטי  undefined ובמידה והפרופרטי שהתקבל בפונקציה הוא 
        //ואני לא נכנס לתנאי
        if(Employees[prop] !== undefined) {
            dbEmployees[prop] = Employees[prop];
        }
    }

    const updatedEmployees = await updateFullEmployees(new EmployeesModel(dbEmployees));

    return updatedEmployees;
}

//פונ' שמוחקת מוצר
async function deleteEmployees(id: number): Promise<void> {
    
    //שאילתת מחיקה 
    const sql = `DELETE FROM Employees WHERE EmployeeID = ${id}`;

    //פה המשתנה שלנו יכיל את כל מידע על המוצר שנימחק 
    const info: OkPacket = await dal.execute(sql);

    if(info.affectedRows === 0) throw new ErrorModel(404, `id ${id} not found`);
}

export default {
    getAllEmployees,
    getOneEmployees,
    addEmployees,
    updateFullEmployees,
    updatePartialEmployees,
    deleteEmployees,
};

