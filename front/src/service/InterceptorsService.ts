import axios from 'axios';
import store from '../redux/Store';

//Interceptor
//Request או בכל Response. זהו מנגנון המאפשר לבצע קוד בצורה אוטומטית בכל
//אם קיים token  אנו רוצים לשלוח לשרת את ה Response לדוג בכל 
//index.tsx את הפונ' הזו אנו חייבים להזין בדף  הראשי של הפרוייקט שלנו  ב
// interceptorsService.createInterceptors(); :כך

//פונ' זו תתבצע בכל בקשה שאנו נוציא בפרוייקט שלנו 
class InterceptorsService {
  public createInterceptors(): void {
      //פה אנו נקבל בפרמטר הפונ' את הבקשה עצמה שהוצאנו לפועל ולאחר מכן אנו נירשום תנאי
      //של הבקשה headers שבמידה וקיים בסטור טוקן אנו ניקח אותו ונשלח אותו ביחד עם הבקשב במיקום ה 
      //וכך אנו תמיד נישמור בסטייט את הטוקן שלנו
    axios.interceptors.request.use((request) => {
      if (store.getState().authState.token) {
          console.log(store.getState().authState.token);
          
        request.headers = {
          authorization: 'berer ' + store.getState().authState.token,
        };
        
      }
      return request;
    });
  }
}

const interceptorsService = new InterceptorsService();

export default interceptorsService;