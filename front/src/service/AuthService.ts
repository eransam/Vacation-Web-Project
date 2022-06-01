import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { loginAction, logoutAction, registerAction } from "../redux/AuthState";
import store from "../redux/Store";
import { resetVacotionAction } from "../redux/VacotionState";
import config from "../utils/Config";
import socketService from "./SocketService";


class AuthService {

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(config.registerUrl, user);
        const token = response.data;
        
        store.dispatch(registerAction(token));
    }

    //פונ' שמקבלת את השם משתמש והסיסמא
    public async login(credentials: CredentialsModel): Promise<void> {
        //משתנה אשר שולח את שם המשתמש והסיסמא ומקבל תשובה 
        const response = await axios.post<string>(config.loginUrl, credentials); // Unique case for post without adding data to database.
        const token = response.data;
        store.dispatch(loginAction(token));


    }

    public async logout(): Promise<void> {
        const resetVac:any=[];
        await socketService.disconnect();
        store.dispatch(logoutAction());
        store.dispatch(resetVacotionAction(resetVac));
    }

}

const authService = new AuthService();

export default authService;