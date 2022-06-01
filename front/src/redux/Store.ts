import { combineReducers, createStore } from "redux";
import { authReducer } from "./AuthState";
import { VacationReducer } from "./VacotionState";
import { composeWithDevTools } from "redux-devtools-extension";






// Creating reducers object from all our reducers: 
//כל הערכים שיוחזרו מפונ' הרדיוסר הנ''ל יוכנסו לסטור ויאוחסנו שם
// זה בעצם שם המקום בזכרון בסטור שבוא  האובייקטים שנשמרים בסטור נמצאים לפי סוג רדיוסר vacationState ה
//vacationState ישמר בסטור תחת המשתנה  VacationReducer לדוג כל אובייקט שנשלח מה
//הסטור בעצם משמש לקריאה של אובייקטים מכל מקום בפרוייקט
const reducers = combineReducers({vacationState: VacationReducer, authState: authReducer});

// The most important Redux object: 
const store = createStore(reducers, composeWithDevTools());

export default store;
