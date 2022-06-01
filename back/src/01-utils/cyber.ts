import jwt from "jsonwebtoken";
import UserModel from "../03-models/user-model";

//שאנו צריכים רק לקרוא לה כך ללא התקנה node  סיפרייה שמורה כבר ב 
//hash סיפרייה זו היא סיפריית אבטחה המייצרת בין היתר קוד 
import crypto from "crypto";

//פה אנו מוסיפים לקוד שלנו עוד מילה מפתח לפי שאנו עושים לו
// שיהיה קשה לפרוץ את הסיסמא שלנו Hash
const salt = "MakeThingsGoRight"; // Hash salt.

// Hash password:
//*בגדול פקודה זו לוקחת את הסיסמא שהזין המשתמש ומחזירה מחרוזת קשה מאוד לפיצוח במקומו
function hash(plainText: string): string {

    if(!plainText) return null;

    // Hashing without salt:
        //עם אלגוריתם חד כיווני hash פה אנו רואים פקודה אשר לוקח את הקוד מהמשתמש והופכת אותו לקוד 
    // const hashedText = crypto.createHash("sha512").update(plainText).digest("hex"); // hex --> convert to string
    // Hashing with salt:
    // HMAC = Hashed based Message Authentication Code
    //ופה אנו עושים אותו דבר רק עם פקודה קצת שונה אשר גם משלבת את מילת המפתח שלנו ביצירת קוד האשין
    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex"); // hex --> convert to string

    return hashedText;
}


//פה אנו יוצרים מילת מפתח שדרכה אנו נוכל לראות נתונים מהתוקן שיווצר
const secretKey = "KittensAreCute";

function getNewToken(user: UserModel): string {

    // The object we're setting inside the token: 
    const payload = { user };

    // Generate token: 
    //שלנו ושלוחים עליה גם את היוזר וגם את  jwt כדי לייצר תוקן אנו מזמנים פונ' מסיפריית ה
    //מילת המפתח
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

    // Return the token:
    return token;
}

// Verify token:
//של הבקשה  authorizationHeader פונ' אשר מקבלת את התוקן מה
function verifyToken(authorizationHeader: string): Promise<boolean> {

    return new Promise((resolve, reject) => {

        // If there is no authorization header: 
        //פה יש תנאי שבמידה ואין תוקן תחזיר שקר
        if(!authorizationHeader) {
            resolve(false);
            return;
        }

        // Extract the token ("Bearer given-token"): 
        //לפני התוקן שלנו אז בשביל לחלץ  "Bearer" התוקן שלנו מגיע עם השרשור 
        //את התוקן אנו עושים את הפעולות הבאות
        const token = authorizationHeader.split(" ")[1];

        // If there is no token: 
        //פה אנו שמים שוב תנאי שבמידה ואין תוקן אנו נחזיר שוב שקר
        if(!token) {
            resolve(false);
            return;
        }

        // Here we have a token: 
        //במידה והגיע אלינו תוקן אנו מזהים אותו
        jwt.verify(token, secretKey, (err) => {

            // If token expired, if token not legal:
            //במידה ובתהליך הזיהוי של התוקן ע''י פונ' של הסיפריה שלנו ניזרקת שגיאה
            //זה אומר שהתוקן שלנו לא תקין או שפג התוקף שלו לדוג' ואנו שוב נזרוק שגיאה
            if(err) {
                resolve(false);
                return;
            }

            // Here the token is legal: 
            //במידה והקוד חוקי אנו נחזיר אמת
            resolve(true);
        });

    });

}

function getUserFromToken(authorizationHeader: string): any {
    const token = authorizationHeader.split(' ')[1]

    const payload: any = jwt.decode(token)

    const user = payload.user

    return user
}



export default {
    getUserFromToken,
    hash,
    getNewToken,
    verifyToken
};