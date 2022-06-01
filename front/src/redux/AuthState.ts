import jwtDecode from "jwt-decode";
import UserModel from "../Models/UserModel";

// State
//פה אנו יוצרים קלאס
export class AuthState {

    //אלו הפרופרטיז של הקלאס
    public user: UserModel = null;
    public token: string = null;

    public constructor() {
        //יהיה שווה לערך הנמצא  token פה אנו קובעים שהפרופרטיז 
        //key= "token"בלוקל סטורזבמקום ה 
        this.token = localStorage.getItem("token");
        //במידה ויש לנו ערך בלוקל סטורג' אנו נחלץ גם את  פרטי היוזר שלנו דרך הסיפרייה
        //שיודעת לחלץ פרטי משתמש מטוקנים
        if(this.token) {
            const encodedObject: any = jwtDecode(this.token);
            this.user = encodedObject.user;
        }
    }

}

// Action Type
export enum AuthActionType {
    Register = "Register",
    Login = "Login",
    Logout = "Logout"
}

// Action
export interface AuthAction {
    type: AuthActionType;
    payload?: string; // Optional (on Logout we don't need to supply a payload)
}

// Action Creators: 
//פה אנו יוצרים פונ' אשר מקבלת פרמטר ומחזירה אובייקט עם הפרופרטיז האלה אשר
//יהיה כתוב הטוקן payload  ובערך "Register" יהיה כתוב type בערך של ה 
export function registerAction(token: string): AuthAction {
    return { type: AuthActionType.Register, payload: token };
}

//כנ''ל עם טייפ אחר 
export function loginAction(token: string): AuthAction {
    return { type: AuthActionType.Login, payload: token };
}

//כנ''ל עם טייפ אחר 
export function logoutAction(): AuthAction {
    return { type: AuthActionType.Logout };
}

// Reducer: 
// store.dispatch שכל מה שנשלח מה action פה אנו יוצרים את הפונ' הראשית רדיוסר אשר מקבלת כפרמטרים את הקלאס הנ''ל ואת האובייקט 
//action מגיע ישר למשתנה  
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    //כאן המשתנה שלנו שווה לשיכפול הקלאס הנ''ל
    const newState = { ...currentState };
    
    //במידה והטייפ של ההאינטרפייס שהוכנס לפונ' הרדיוסר שלנו יהיה מסוג הנמצא בתוך הפרופרטי
    //AuthActionType.Login: או AuthActionType.Register 
    //action ושולחים אובייקט מסויים דרכו האובייקט נכנס כערך לתוך הפרמטר  store.dispatch כאשר אנו עושים 
    switch (action.type) {
        case AuthActionType.Register:
        case AuthActionType.Login:

            //שהגיע לנו מאובייקט הנשלח מהפקודה  action.payload לאחר מיכן אנו מכניסים את הערך הנמצא בתוך 
            //token אל תוך הערך של הקלאס שלנו בפרופרטי AutoService שבמקרה שלנו הוא נשלח מה  store.dispatch 
            newState.token = action.payload; // Here the payload is the token sent from the backend.

            //jwt כך אנו מחלצים את פרטי היוזר שלנו מהטוקן דרך הסיפרייה 
            const encodedObject: any = jwtDecode(newState.token); // Convert to any for getting the inside "user" object.

            //user כך אנו מכניסים את פרטי היוזר שחילצנו אל הערך של הקלאס שלנו 
            newState.user = encodedObject.user;

            //לאחר מכן אנו מכניסים את ערך הטוקן שלנו ללוקל סטורג
            localStorage.setItem("token", newState.token);
            break;

        case AuthActionType.Logout:
            //במידה ואנו מקבלים אובייקט מסוג לוג-אאוט שזה אומר שהמשתמש התנתק אנו נגדיר שהערכים של הקלאס שלנו 
            //ואנו יוציא את הערך של הטוקן שלנו מהלוקל סטורג null יהיו  
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }
    return newState;
}