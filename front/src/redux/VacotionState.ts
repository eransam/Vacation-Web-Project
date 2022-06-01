import VacotionModel from "../Models/VacationModel";

export class VacotionsState {
    public Vacotion: VacotionModel[] = [];
}

export enum VacotionActionType {
    FetchVacotion = "FetchVacotion",
    AddVacotion = "AddVacotion",
    UpdateVacotion = "UpdateVacotion",
    DeleteVacotion = "DeleteVacotion",
    Follow = 'Follow',
    Un_follow = 'Un_follow',
    resetVacotionState = 'resetVacotionState'
}

export interface VacotionAction {
    type: VacotionActionType;
    payload: any;
}

export function fetchVacotionAction(Vacation: VacotionModel[]): VacotionAction {
    return { type: VacotionActionType.FetchVacotion, payload: Vacation };
}
export function resetVacotionAction(Vacation:[]): VacotionAction {
    return { type: VacotionActionType.resetVacotionState, payload: Vacation };
}
export function addVacotionAction(Vacotion: VacotionModel): VacotionAction {
    return { type: VacotionActionType.AddVacotion, payload: Vacotion };
}
export function updateVacotionAction(Vacotion: VacotionModel): VacotionAction {
    return { type: VacotionActionType.UpdateVacotion, payload: Vacotion };
}
export function deleteVacotionAction(id: number): VacotionAction {
    return { type: VacotionActionType.DeleteVacotion, payload: id };
}
export const followVacationAction = (id: number): VacotionAction => {
    return {
      type: VacotionActionType.Follow,
      payload: id,
    };
  };
  export const unFollowVacationAction = (id: number): VacotionAction => {
    return {
      type: VacotionActionType.Un_follow,
      payload: id,
    };
  };

// נישלחת ישירות לפרמטר השני הפונ' הרדיוסר dispeach האובייקט המגיע מהפקודה 
export function VacationReducer(currentState = new VacotionsState(), action: VacotionAction): VacotionsState {

    const newState = { ...currentState };

    switch (action.type) {

        case VacotionActionType.FetchVacotion:
            newState.Vacotion = action.payload; 
            break;

        case VacotionActionType.resetVacotionState:
                newState.Vacotion = action.payload; 
                break;
        case VacotionActionType.AddVacotion:
            newState.Vacotion.push(action.payload); 
            break;

        case VacotionActionType.UpdateVacotion:
            const indexToUpdate = newState.Vacotion.findIndex(p => p.vacationId === action.payload.vacationId); // Here the payload is a single object to update.
            if (indexToUpdate >= 0) {
                newState.Vacotion[indexToUpdate] = action.payload;
            }
            break;

        case VacotionActionType.DeleteVacotion:
            const indexToDelete = newState.Vacotion.findIndex(p => p.vacationId === action.payload); // Here the payload is the id to delete.
            if (indexToDelete >= 0) {
                newState.Vacotion.splice(indexToDelete, 1);
            }
            break;
            // follow במידה והאובייקט שנשלח הוא מסוג 
            //(על חופשה מסויימת follow הכוונה שהלקוח הזין)
            //של החופשה vacationId יהיה ה action.payload הערך של ה  
            case VacotionActionType.Follow:
                // אנו ניצור משתנה 
                const indexToFollow = newState.Vacotion.findIndex(
                  (vacation) => vacation.vacationId === action.payload
                );
                if (indexToFollow >= 0) {
                  newState.Vacotion[indexToFollow].isFollowing = true;
                }
                break;
              case VacotionActionType.Un_follow:
                const indexToUnFollow = newState.Vacotion.findIndex(
                  (Vacotion) => Vacotion.vacationId === action.payload
                );
                if (indexToUnFollow >= 0) {
                  newState.Vacotion[indexToUnFollow].isFollowing = null;
                }
                break;
    }

    return newState;
}
