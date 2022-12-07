import { io, Socket } from 'socket.io-client';
import config from '../utils/Config';
import VacationService from './productService';
import vacationService from './productService';

class SocketService {
  private socket: Socket;

  //פונ' אשר מתחברת לסרבר
  public connect(): void {
    // connection כך אנחנו מתחברים לסוקט של הסרבר  ופעולת ההתחברות הזו עוברת לסרבר באיבנט ה
    // this.socket = io(config.socket);
    this.socket = io("http://localhost:3001/");

    //וכאשר  refresh-vacations לאחר שהתחברנו לסוקט של הסרבר אנו נפתח פה עוד סוקט שיאזין לאיבנט 
    //VacationService.fetchVacotion() יקבל קריאה מהאיבנט הזה הוא יפעיל את הפונ 
    //****('refresh-vacations' הוא אוטומטית ישלח קריאה חוזרת באיברנט  'vacations-change' בבק שלנו יש לוגיקה של סוקט שבמידה והסרבר יקבל קריאה מהאיבנט)
    //     (VacationService.fetchVacotion(true) וכך תופעל הפונקציה)
    //****(אנו מזמן בעדכון הוספה ומחיקה של חופשות בתפריט האדמין 'vacations-change' את הפונקציות אשר שולחות לסרבר את האיבנט  )
    //****(משנה את הסטייט ואז הקומפוננטה  fetchVacotion וכן הפרונט יוכל לראות אונליין את השינויים ברשימת החופשות בגלל שהפונ')
    //****(מתרנדרת ומציגה את החופשות העדכניות שנמצאות בסטור vacationList)
    this.socket.on('refresh-vacations', () => {
      
        VacationService.fetchProduct(true)

    });
  }

  //פונ' אשר מנתקת את חיבור הסוקט
  public disconnect(): void {
    this.socket.disconnect();
  }

  //vacations-change פונ' אשר שולחת לסרבר קריאה ריקה באיבנט 
  public vacationsChange(): void {
    this.socket.emit('vacations-change');
  }
}

const socketService = new SocketService();

export default socketService;