import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { addVacotionAction, deleteVacotionAction, fetchVacotionAction, followVacationAction, unFollowVacationAction, updateVacotionAction } from "../redux/VacotionState";
import store from "../redux/Store";
import config from "../utils/Config";
import SocketService from "./SocketService";

class vacotionService {

    public async fetchVacotion(socketSend: boolean): Promise<VacationModel[]> {
        console.log("eran");
        
        if(store.getState().vacationState.Vacotion.length === 0  || socketSend === true) {
            const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            const vacotion = response.data;
            store.dispatch(fetchVacotionAction(vacotion));
            console.log("vacationState: " ,store.getState().vacationState.Vacotion);

        }
        console.log("vacationState: " ,store.getState().vacationState.Vacotion);
        
        return store.getState().vacationState.Vacotion;
    }


    public async resetVacationState(): Promise<VacationModel[]> {
        console.log("eran");
        
        
            //const response = await axios.get<VacationModel[]>(config.vacationsUrl);
            const vacotion:any =[];
            store.dispatch(fetchVacotionAction(vacotion));

            console.log("vacationState: " ,store.getState().vacationState.Vacotion);
        console.log("vacationState: " ,store.getState().vacationState.Vacotion);
        
        return store.getState().vacationState.Vacotion;
    }




    public async getOneVacotion(vacationId: number): Promise<VacationModel> {
        let vacotion = store.getState().vacationState.Vacotion.find(p => p.vacationId === vacationId);
        if(!vacotion) {
            const response = await axios.get<VacationModel>(config.vacationsUrl + vacationId);
            vacotion = response.data;
        }
        return vacotion;
    }

    public async deleteOneVacotion(vacationId: number): Promise<void> {
        await axios.delete(config.vacationsUrl + vacationId);
        store.dispatch(deleteVacotionAction(vacationId));
        SocketService.vacationsChange();
        return; 
    }

    public async addNewVacation(vacation: VacationModel): Promise<VacationModel> {
        console.log("#################")
        // Convert out product to FormData:
        let formData = new FormData();
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image.item(0));



        // Post the new product to the server: 
        const response = await axios.post<VacationModel>(config.vacationsUrl, formData);
        console.log(response);
        const addedVacotion = response.data;        

        // Add to redux global state: 
        store.dispatch(addVacotionAction(addedVacotion));
        SocketService.vacationsChange();

        return addedVacotion;
    }

    public async updateVacotion(vacation: VacationModel): Promise<VacationModel> {
        console.log("vacationService-vacation: ",vacation);
        
        // Convert out product to FormData:
        const formData = new FormData();
        formData.append("vacationId", vacation.vacationId.toString());
        formData.append("description", vacation.description);
        formData.append("startDate", vacation.startDate.toString());
        formData.append("endDate", vacation.endDate.toString());
        formData.append("price", vacation.price.toString());
        formData.append("image", vacation.image.item(0));


        console.log("vacation.image.item(0):    " , vacation.image.item(0));

        console.log("formData:    " ,formData);
        
        
        // Put the new product to the server: 
        const response = await axios.put<VacationModel>(config.vacationsUrl + vacation.vacationId, formData);
    
        const updatedVacotion = response.data;
        console.log("eran");
        

        // Add to redux global state: 
        store.dispatch(updateVacotionAction(updatedVacotion));
        SocketService.vacationsChange();

        return updatedVacotion;
    }





    
    //פונ' שמקבלת איידי של חופשה ומבצעת בקשה לשרת
    //ודרך הפעולות שמתבצעות מאחוריה בקשה זו יוזן בדאטה בייס מידע על היוזר(יוזר-איידי)
    //(vacationId) ועל החופשה שהוא עוקב אחריה  
    //followers בטבלת 
    public async followVacation(vacationId: number): Promise<void> {
        console.log("config.followsUrl + vacationId: ", config.followsUrl + vacationId);
        
        await axios.post(config.followsUrl + vacationId);

        //כך המידע הנ''ל ישמר גם בסטור
        store.dispatch(followVacationAction(vacationId));
      }




    
      public async unFollowVacation(vacationId: number): Promise<void> {
        await axios.delete(config.followsUrl + vacationId);
    
        store.dispatch(unFollowVacationAction(vacationId));
      }


    
}

const vacotionsService = new vacotionService();

export default vacotionsService;