import { any } from 'joi';
import { OkPacket } from 'mysql';
import cyber from '../01-utils/cyber';
import CredentialsModel from '../03-models/credentials-model';
import ErrorModel from "../03-models/error-model";
import UserModel from '../03-models/user-model';
import dal from "../04-dal/dal";
import { v4 as uuid } from 'uuid';



async function getAllUsers(): Promise<UserModel[]> {
    //אנו יוצרים משתנה עם שאילתת אסקיואל
    const sql = `SELECT
    userId AS userId,
    firstName AS firstName,
    username AS username,
    password AS password
    FROM users`;

    //יוצרים משתנה ומבצעים לתוכו בקשה לדאטה בייס עם השאילתה שיצרנו קודם לכן
    const users = await dal.execute(sql);
    //אנו מחזירים את המשתנה שמכיל בתוכו את התשובה מהבקשה שלנו 
    //שבמקרה שלנו התשובה זה כל המוצרים מהדאטה בייס
    return users;
}


async function register(user: UserModel): Promise<string> {

    // Validation...

    // Test if username already taken:
    //isUsernameTaken פה אנו בודקים עם קיים כבר שם משתמש כזה דרך הפונ' שיצרנו 
    const isTaken = await isUsernameTaken(user.username);
    //הפונ'' הנל היא בוליאנית ומחזירה אמת או שקר
    //במידה ויש משתמש כזה היא תחזיר אמת ואז נכנס לתנאי ותזרוק שגיאה
    if (isTaken) {
        throw new ErrorModel(400, `Username ${user.username} already taken`);
    }

    // Hash password before entering to database:
    // דרך הפונ' שיצרנו hash פה אנו מקבלים את הסיסמא האמיתית של המשתמש והופכים אותה לסיסמת 
    //cyber בקובץ ה
    user.password = cyber.hash(user.password);
    user.userId = uuid();

    // sql:
    const sql = `INSERT INTO users VALUES('${user.userId}','${user.firstName}','${user.lastName}','${user.username}','${user.password}','${user.role}')`;

    // Save:
    //פה אנו מקבלים לאחר ביצוע השאילתה על הדאטה בייס שלנו את כל הפרטים על האובייקט שהתווסף
    const info: OkPacket = await dal.execute(sql);

    // ID:
    // user.id פה אנו מכניסים את ערך האידיי של האובייקט שהוספנו לתוך הערך של הפרופרטי 
    //user.userId = info.insertId;

    // Remove password:
    //פה אנו מוחקים את הסיסמא של היוזר לפני שאנו מבקשים תוקן בשביל שלא יוחלו לחלץ את הסיסמא 
    //מפרטי התוקן 
    delete user.password;
    

    // Token:

    const token = cyber.getNewToken(user);

    // Return:
    return token;
}















async function login(credentials: CredentialsModel): Promise<string> {

    // Validation...

    // Hash password before comparing to database:
    credentials.password = cyber.hash(credentials.password);

    // sql:
    // const sql = `SELECT * FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
    //פה אנו רוצים לאבטח את השאילתה שלנו כדי שלא יוכלו לראות מידע רגיש 
    // לשם כך אנו רושמים "?" במקום הערך הרגיש בשאילתה ואת בערך הרגיש שלנו אנו רושמים 
    //שפונ' זו מקבלת values בפרמטר  execute בפונ
    //המערכת באופן אוטומטי מחברת כל ערך בווליו לסימן שאלה בשאילתה לפי הסדר
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;

    // Execute
    const users = await dal.execute(sql, [credentials.username, credentials.password]);

    // If not exists:
    if (users.length === 0) {
        throw new ErrorModel(401, "Incorrect username or password");
    }

    // Get user:
    const user = users[0];

    // Remove password:
    delete user.password;

    // Token:
    //פה אנו מייצרים את התוקן
    const token = cyber.getNewToken(user);

    // Return:
    //ופה אנו מחזירים את התוקן
    return token;
}

//פונ' אשר בודקת אם כבר קיין משתמש כזה במערכת 
async function isUsernameTaken(username: string): Promise<boolean> {
    //שאילתה אשר בודקת האם יש לה תא בדאטה בייס אשר בשדה שם המשתמש יש שם משתמש זהה 
    //זהה לשם המשתמש שלנו, במידה ויש השאילתה תחזיר לנו את הערך 1 
    //(במידה ויש את הערך הזה יותר מפעם אחד הפונ' תחזיר לנו את מספר הפעמים)
    //במידה ואין
    //השאילתה תחזיר לנו את הערך 0
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;
    
    //execute פה אנו שולחים את השאילתה לדאטה בייס שלנו בעזרת פונ' ה
    //והשאילה הזו תחזיר לנו את מס הפעמים שערך זה קיים לנו המערכת 
    //  (במידה ולא קיים תחזיר 0) 
    //בתוך מערך
    const table = await dal.execute(sql);

    //פה אנו מבקשים את האיבר הראשון במערך כדי לחלץ את האובייקט שקיבלנו מתוך מסגרת המערך
    const row = table[0];

    //אשר בתוכו יש לנו את  count פה אנו מחלצים מהתושבה שקיבלנו רק את הפרופרטי 
    //מס הפעמים שבהם מופיע הערך שלנו בדאטה בייס במידה ואכן קיים
    const count = row.count;

    //ופה אנו מחזירים ערך אמת או שקר 
    //גדול מאפס זאת אומרת שכן קיים לנו משתמש בשם זהה במערכת אנו נחזיר אמת  count במידה וה
    //ובמידה והוא לא גדול מ0 זה אומר שאין לנו משתמש עם שם זהה במערכת ואנו נחזיר שקר
    return count > 0;
}

export default {
    register,
    login,
    getAllUsers
}