import { NextFunction, Request, Response } from "express";
import config from "../01-utils/config";
import logger from "../01-utils/logger";

function errorsHandler(err: any, request: Request, response: Response, next: NextFunction): void {
    
//אם יש לשגיאה שמדווחת סטוטס - הוא נלקח.
//אם אין - נלקח 500 כי לפעמים יש קריסות מערכת (שזה אומר 500)
//ללא שום משתנה status, לכן במצב כזה מכניסים 500 בצורה יזומה.
    const status = err.status || 500; // 500 = Server Crash

    console.log(err);

    if(status === 500) {
        //וכך אנו קובעים שבמידה ותיהיה פה שגיאה  logger.ts פה אנו מזמנים את פונ' הלוגר שלנו מקובץ ה 
        //פונ' זו תיצור לנו קובץ טקסט עם כל פרטי הבעיה
        logger.log(err.message, err);
    }

    //פה אנו עושים זאת בשביל אבטחה כדי שהמשתמש שלנו לא יקבל ויראה את שגיאות המערכת שלנו 
    let msg;
    if(config.isdevelopment) {
        msg = err.message;
    }
    else if(status !== 500) { // Production && status !== 500
        msg = err.message;
    }
    else {
        msg = "Some error, please try again..."; // Production && 500
    }

    response.status(status).send(msg);
}

export default errorsHandler;